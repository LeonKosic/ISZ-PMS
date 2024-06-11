import { users } from "../db/schema/users.js"

import { Name, eq, like, and } from 'drizzle-orm';

import { db } from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { authenticateToken } from "../middleware/auth.js"
import { follow } from "../db/schema/follow.js";
import { partners } from "../db/schema/partners.js";
import { enrolled } from "../db/schema/enrolled.js";
import { course } from "../db/schema/course.js";
import { post } from "../db/schema/post.js";

const router = express.Router();
const jsonParser = bodyParser.json()

function generateAccessToken(user) {

  const secret = process.env.JWT_KEY;
  const options = { expiresIn: '1h' };

  return jwt.sign(user, secret, options);
}

router.post('/login', jsonParser, async (req, res) => {

  const existingUser = await db.select().from(users).where(eq(users.username, req.body.username));
  if (existingUser.length <= 0) {
    res.send(400, { err: "Username does not exists." })
    return
  }
  const passwordMatch = await bcrypt.compare(req.body.password, existingUser[0].password);

  if (passwordMatch) {
    const accessToken = generateAccessToken(existingUser[0]);
    return res.status(200).json({ accessToken: accessToken, username: existingUser[0].username, role_id: existingUser[0].role_id, name: existingUser[0].name, id: existingUser[0].id});
  }

  return res.status(401).json({ err: "Wrong password." });
});

router.post('/register', jsonParser, async (req, res) => {

  const schema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
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

  const existingUser = await db.select().from(users).where(eq(users.username, req.body.username));
  if (existingUser.length > 0) {
    res.send(400, { err: "Username already exists." })
    return
  }
  if (req.body.password != req.body.password2) {
    res.send(400, { err: "Passwords do not match." })
    return
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  var partner = req.body.email.split("@");
  const Partners = await db.select().from(partners);
  let roleId = 3;
  let isActive = 0;

  for (const partnerData of Partners) {
    console.log(partner[1], partnerData.domain)
    if (partner[1].includes(partnerData.domain)) {
      if (partner[1].includes("student")) {
        roleId = 1;
        isActive = 1;
      } else {
        roleId = 2;
        isActive = 1;
      }
      break;
    }
  }

  await db.insert(users).values([{
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: hash,
    deleted: 0,
    role_id: roleId,
    is_active: isActive
  }]);

  res.send(200, { message: roleId === 3 ? "Request sent." : "Account registered." });
  return

})


router.delete('/user', authenticateToken, jsonParser, async (req, res) => {
  const existingUser = await db.select().from(users).where(eq(users.id, req.user.id));
  if (existingUser.length <= 0) {
    res.send(400, { err: "Username does not exist." })
    return
  }
  await db.update(users).set({ deleted: '1' }).where(eq(users.username, req.user.id))
  res.send(200, { message: "Account deleted." })

})

router.put('/edit', jsonParser, authenticateToken, async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().optional(),
    name: Joi.string().optional(),
    email: Joi.string().email().optional()
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(200).json({ message: 'Data is not valid.' });
    return
  }
  const result = await db.update(users).set(req.body).where(eq(users.id, req.user.id))
  return res.status(200).json(result);
});

router.get('/details', authenticateToken, jsonParser, async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).send({ err: "Missing username parameter." });
  }

  const existingUser = await db.select().from(users).where(eq(users.username, username));

  if (existingUser.length > 0) {
    return res.status(200).send({
      username: existingUser[0].username,
      name: existingUser[0].name,
      email: existingUser[0].email
    });
  }

  return res.status(400).send({ err: "Username does not exist." });
});
router.post('/search', jsonParser, async (req, res) => {
  const existingUser = await db.select().from(users).where(like(users.username, `%${req.body.username}%`) && eq(users.deleted, 0) && eq(users.is_active, 1));
  if (existingUser.length > 0) {
    existingUser.map((user) => {
      delete user.password
    })
  }
  return res.send(200, existingUser)
})


router.put('/unfollow', jsonParser, authenticateToken, async (req, res) => {s
  await db.delete(follow).where(and(
    eq(follow.follower_id, req.user.id),
    eq(follow.following_id, req.body.id)))
  res.status(200).send({ message: "Unfollow." })
})

router.post('/follow',jsonParser,authenticateToken,async(req,res)=>{
  await db.insert(follow).values(
    [{follower_id: req.user.id,
    following_id:req.body.id
  }])
  res.status(200).send({message:"Following."})

})

router.get("/:id", authenticateToken, async (req, res) => {
  const user = await db.select().from(users).where(eq(users.id, req.params.id));
  if (user.length <= 0) {
    res.status(400).send({ err: "User does not exist." })
    return
  }
  delete user[0].password
  const follows = await db.select().from(follow).where(eq(follow.following_id, req.params.id) && eq(follow.follower_id, req.user.id));
  res.status(200).send({...user[0], follows:(follows.length > 0)})
});

router.get('/followers/:id', authenticateToken, async (req, res) => {
  const followers = await db.select().from(users).leftJoin(follow, eq(users.id, follow.follower_id))
    .where(eq(follow.following_id, req.params.id))
  res.status(200).send(followers)
})
router.get('/following/:id', authenticateToken, async (req, res) => {
  const followers = await db.select().from(users).leftJoin(follow, eq(users.id, follow.following_id))
    .where(eq(follow.follower_id, req.params.id))
  res.status(200).send(followers)
})
router.get('/projects/:id', authenticateToken, async (req, res) => {
  const projects = await db.select().from(post).where(eq(post.owner_id, req.params.id) && eq(post.type, 1) && eq(post.deleted, 0));

  res.status(200).json(projects)
})


export default router;