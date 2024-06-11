
import { Name, eq, and } from 'drizzle-orm';
import { db } from '../db/db.js';
import express from 'express';
import jwt from 'jsonwebtoken'
import { authenticateToken } from "../middleware/auth.js"
import { category } from '../db/schema/category.js';
import { project } from '../db/schema/project.js';
import { post_category } from '../db/schema/post_category.js';
const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import Joi from 'joi'
import { follow } from '../db/schema/follow.js';
import { post } from '../db/schema/post.js';
import { board } from '../db/schema/board.js';
import { checkIfTeamMember } from '../middleware/project.js';
import { project_members } from '../db/schema/project_members.js';
import { users } from '../db/schema/users.js'
import { comment } from '../db/schema/comment.js'
import { commit } from '../db/schema/commit.js'

router.post('/category', jsonParser, async (req, res) => {
  await db.insert(post_category).values(
    [{
      category_id: req.body.category_id,
      post_id: req.body.project_id
    }])
  res.status(200).send({ message: "Project assigned to a category." })
})

router.delete('/:id', jsonParser, async (req, res) => {
  const existingProject = await db.select().from(post).where(eq(post.id, req.params.id));
  if (existingProject.length <= 0) {
    res.send(400, { err: "Project with this name does not exist." })
    return
  }
  await db.update(post).set({ deleted: '1' }).where(eq(post.id, req.params.id))
  res.send(200, { message: "Project deleted." })
})

router.post('/', authenticateToken, jsonParser, async (req, res) => {

  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().optional(),
  })
  const options = {
    errors: {
      wrap: {
        label: false
      }
    }
  }
  console.log(req.body)
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    res.send(400, { err: error.details })
    return
  }
  const newBoard = await db.insert(board).values({})
  const newPost = await db.insert(post).values(
    [{
      ...req.body,
      deleted: 0,
      category_id: 1,
      owner_id: req.user.id,
      type: 1,
      board_id: newBoard[0].insertId
    }]
  );
  await db.insert(project).values([{ id: newPost[0].insertId }])
  res.status(200).send({ message: "Project made." });
})

router.get('/my', authenticateToken, jsonParser, async (req, res) => {
  const projects = await db.select().from(post).where(eq(post.owner_id, req.user.id) && eq(post.type, 1));

  res.status(200).json(projects)
})

router.get('/following', authenticateToken, jsonParser, async (req, res) => {
  const followingProjectNames = await db.select().from(post).leftJoin(follow, eq(post.owner_id, follow.following_id))
    .where(eq(follow.follower_id, req.user.id) && eq(post.type, 1))
  res.status(200).send(followingProjectNames)

})

router.post('board/post', authenticateToken, jsonParser, checkIfTeamMember, async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().optional(),
    board_id: Joi.number().required()
  })
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
  const project = await db.select().from(project).where(eq(project.id, req.body.project_id))
  const newPost = await db.insert(post).values(
    [{
      ...req.body,
      deleted: 0,
      owner_id: req.user.id,
      type: 0,
      parent_id: project[0].board_id
    }]
  );
  res.status(200).send({ message: "Post made." });
})
router.get('/board/:id', authenticateToken, jsonParser, checkIfTeamMember, async (req, res) => {
  const posts = await db.select().from(post).where(eq(post.board_id, req.params.id) && eq(post.type, 0) && eq(post.deleted, 0) && eq(post.isFeatureRequest, 0));
  res.status(200).json(posts)
})
router.post('/register', authenticateToken, jsonParser, checkIfTeamMember, async (req, res) => {
  await db.insert(project_members).values({
    project: req.body.project_id,
    user: req.body.user_id
  })
})
router.get("/:id", authenticateToken, async (req, res) => {
  const existingProject = await db.select().from(post).where(eq(post.id, req.params.id));
  const comments = await db.select().from(comment).where(eq(comment.post, req.params.id));
  const team = await db.select({ id: users.id, username: users.username, name: users.name }).from(project_members).where(eq(project_members.project, req.params.id)).leftJoin(users, eq(project_members.user, 'users.id'))
  const commits = await db.select().from(commit).where(eq(commit.project_id, req.params.id));
  if (existingProject.length <= 0) {
    res.send(400, { err: "Post with this name does not exist." })
    return
  }
  const head = existingProject[0].head;
  const files = await db.execute(sql`select id, path from file join commited_files on file.id = commited_files.fileId where commitId = (select max(commitId) from commited_files where fileId = file.id group by fileId ) and project = ${req.params.id} and parent is null`)

  res.send(200, { commits, team, files })
})
router.post('/directory/structure', jsonParser, authenticateToken, async (req, res) => {
  const { commit, project_id, path } = req.body;
  const file = await db.select().from(file).where(eq(file.path, path) && eq(file.project, project_id));
  if (file.length < 0) {
    res.status(400).send({ message: "File does not exist." })
  }
  const files = await db.execute(sql`select id, path from file join commited_files on file.id = commited_files.fileId where commitId = (select max(commitId) from commited_files where fileId = file.id group by fileId ) and project = ${project_id} and parent = ${parent}`)
  res.status(200).send(files);
}

)
router.post('/folder/', jsonParser, authenticateToken, async (req, res) => {
  const { commit, project_id, path } = req.body;
})
router.get('/board/:id/requests', authenticateToken, jsonParser, checkIfTeamMember, async (req, res) => {
  const posts = await db.select().from(post).where(eq(post.board_id, req.params.id) && eq(post.type, 0) && eq(post.deleted, 0) && eq(post.isFeatureRequest, 1));
  res.status(200).json(posts)
})
router.post('/search', jsonParser, async (req, res) => {
  const existingProject = await db.select().from(post).where(like(post.title, `%${req.body.title}%`) && eq(post.deleted, 0) && eq(post.type, 1));

  return res.send(200, existingProject)
})
export default router