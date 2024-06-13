import { category } from "../db/schema/category.js"
import { eq, like, and } from 'drizzle-orm';
import { db } from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Joi from 'joi';

import jwt from 'jsonwebtoken'
const router = express.Router();
const jsonParser = bodyParser.json()
import { authenticateToken, authenticateTeacher } from "../middleware/auth.js";
import { board, course, course_teachers, users } from "../db/schema/schema.js";
import { enrolled, post } from "../db/schema/schema.js";


router.post('/', authenticateToken, authenticateTeacher, jsonParser, async (req, res) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    password2: Joi.string().required()
  });
  const options = {
    errors: {
      wrap: {
        label: false
      }
    }
  }
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    res.send(400, { err: error.details })
    return
  }
  if (req.body.password != req.body.password2) {
    res.send(400, { err: "Passwords do not match." })
    return
  }
  const newBoard = await db.insert(board).values({})
  console.log(newBoard)
  const hash = await bcrypt.hash(req.body.password, 10);
  const newCourse = await db.insert(course).values(
    [{
      name: req.body.name,
      password: hash,
      deleted: 0,
      board_id: newBoard[0].insertId,
      owner_id: req.user.id
    }]
  );
  res.status(200).send({ message: "Course made.", id: newCourse[0].insertId});
})
router.put("/", jsonParser, authenticateToken, async (req, res) => {
  const existingCourse = await db.select().from(course).where(eq(course.id, req.body.id));
  if (existingCourse.length <= 0) {
    res.status(400).send({ err: "Course does not exist." })
    return
  }
  if (existingCourse[0].owner_id != req.user.id) {
    res.status(400).send({ err: "Not the owner of the course." })
    return
  }
  if (req.body.password) {
    if (req.body.password != req.body.password2) {
      res.status(400).send({ err: "Passwords do not match." })
      return
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash
    delete req.body.password2;
  }
  await db.update(course).set({ ...req.body }).where(eq(course.id, req.body.id))
  res.status(200).send({ message: "Course updated." });
})
router.get('/', authenticateToken, jsonParser, async (req, res) => {
    const courses = await db.select().from(course).where(eq(course.deleted, 0));
    res.status(200).json(courses)
})

router.delete('/:id', authenticateToken, authenticateTeacher, async (req, res) => {
  const existingCourse = await db.select().from(course).where(eq(course.id, req.params.id));
  if (existingCourse.length <= 0) {
    res.status(400).send({ err: "Course does not exist." })
    return
  }
  await db.update(course).set({ deleted: '1' }).where(eq(course.id, req.params.id))
  res.status(200).send({ message: "Course deleted." })
})

router.post('/enroll', authenticateToken, jsonParser, async (req, res) => {

  const existingCourse = await db.select().from(course).where(eq(course.id, req.body.id))
  const passwordMatch = await bcrypt.compare(req.body.password, existingCourse[0].password);
  if (!passwordMatch) {
    return res.status(400).send({ message: "Wrong password." })
  }
  await db.insert(enrolled).values(
    [{
      student_id: req.user.id,
      course_id: existingCourse[0].id
    }])
  res.status(200).send({ message: "Enrolled." })
})

router.delete('/unenroll/:id', authenticateToken, async (req, res) => {
  await db.delete(enrolled).where(and(eq(enrolled.student_id, req.user.id), eq(enrolled.course_id, req.params.id)))
  res.status(200).send({ message: "Unenrolled." })

})


router.post("/post", authenticateToken, jsonParser, async (req, res) => {
  const existingCourse = await db.select().from(course).where(eq(course.id, req.body.course_id));
  if (existingCourse.length <= 0) {
    res.status(400).send({ err: "Course does not exist." })
    return
  }
  const teachers = await db.select().from(course_teachers).innerJoin(users, eq(users.id, course_teachers.teacher_id)).where(eq(course_teachers.course_id, req.body.course_id))
  if (!(teachers.some(teacher => teacher.teacher_id == req.user.id) || existingCourse[0].owner_id == req.user.id)) {
    res.status(400).send({ err: "Not a teacher in this course." })
    return
  }
  const newPost = await db.insert(post).values(
    [{
      ...req.body,
      deleted: 0,
      owner_id: req.user.id,
      type: 0,
      parent_id: existingCourse[0].board_id
    }]
  );
  res.status(200).send({ message: "Post made." });
})

router.post('/search', jsonParser, async (req, res) => {
  const existingCourse = await db.select().from(course).where(and(like(course.name, `%${req.body.name}%`), eq(course.deleted, 0)));
  if (existingCourse.length > 0) {
    existingCourse.map((user) => {
      delete user.password
    })
  }
  return res.send(200, existingCourse)
})
router.post('/teacher', authenticateToken, jsonParser, async (req, res) => {
  const existingCourse = await db.select().from(course).where(eq(course.id, req.body.course_id));
  if (existingCourse.length <= 0) {
    res.status(400).send({ err: "Course does not exist." })
    return
  }
  const teacher = await db.select().from(users).where(eq(users.id, req.body.teacher_id))
  if (teacher.length <= 0) {
    res.status(400).send({ err: "Teacher does not exist." })
    return
  }
  await db.insert(course_teachers).values(
    [{
      teacher_id: req.body.teacher_id,
      course_id: req.body.course_id
    }])
  res.status(200).send({ message: "Teacher added." });
})
router.delete('/teacher/:id', authenticateToken, async (req, res) => {
  await db.delete(course_teachers).where(and(eq(course_teachers.teacher_id, req.params.id), eq(course_teachers.course_id, req.body.course_id)))
  res.status(200).send({ message: "Teacher removed." })

})
router.get('/my', authenticateToken, jsonParser, async (req, res) => {
    const courses = await db.select().from(enrolled).innerJoin(course, eq(course.id, enrolled.course_id)).where(eq(enrolled.student_id, req.user.id));
    res.status(200).json(courses)
})
router.get('/:id', authenticateToken, jsonParser, async (req, res) => {
    const existingCourse = await db.select().from(course).where(eq(course.id, req.params.id));
    const isEnrolled = await db.select().from(enrolled).where(and(eq(enrolled.student_id, req.user.id), eq(enrolled.course_id, req.params.id)))
    const teachers = await db.select().from(course_teachers).innerJoin(users, eq(users.id, course_teachers.teacher_id)).where(eq(course_teachers.course_id, req.params.id))
    if (existingCourse.length <= 0) {
        res.status(400).send({ err: "Course does not exist." })
        return
    }
    if (!(isEnrolled.length > 0 || existingCourse[0].owner_id == req.user.id || teachers.some(teacher => teacher.teacher_id == req.user.id))) {
        res.status(200).send({name: existingCourse[0].name, id: existingCourse[0].id, isEnrolled: false})
        return
    }
    teachers.forEach(t => delete t.users.password)
    delete existingCourse[0].password
    const content = await db.select().from(post).where(eq(post.parent_id, existingCourse[0].board_id))
    res.status(200).send({ ...existingCourse[0], teachers: teachers.map(t => t.users), isTeacher: (teachers.some(teacher => teacher.teacher_id == req.user.id) || existingCourse[0].owner_id == req.user.id), content })
})

export default router;