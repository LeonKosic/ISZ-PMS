import {users} from "../db/schema/users.js"

import { Name,eq, like, and } from 'drizzle-orm';

import {db} from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { authenticateToken } from "../middleware/auth.js"
import { follow } from "../db/schema/follow.js";
import { partners } from "../db/schema/partners.js";

const router = express.Router();
const jsonParser = bodyParser.json()

function generateAccessToken(user) {

  const secret = process.env.JWT_KEY;
  const options = { expiresIn: '1h' };

  return jwt.sign(user, secret, options);
}

router.post('/login', jsonParser, async (req, res) => {

  const existingUser = await db.select().from(users).where(eq(users.user_name, req.body.user_name));
  if (existingUser.length <= 0) {
    res.send(400, { err: "Username does not exists." })
    return
  }
  const passwordMatch = await bcrypt.compare(req.body.password, existingUser[0].password);

  if (passwordMatch) {
    const accessToken = generateAccessToken(existingUser[0]);
    return res.status(200).json({ accessToken });
  }

  return res.status(401).json({ err: "Wrong password." });
});

router.post('/register', jsonParser, async (req, res) => {

  const schema = Joi.object({
    user_name: Joi.string().required(),
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

  const existingUser = await db.select().from(users).where(eq(users.user_name, req.body.user_name));
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
    console.log(partner[1],partnerData.domain)
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
    user_name: req.body.user_name,
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
  const existingUser = await db.select().from(users).where(eq(users.user_name, req.user.user_name));
  if (existingUser.length <= 0) {
    res.send(400, { err: "Username does not exist." })
    return
  }
  await db.update(users).set({ deleted: '1' }).where(eq(users.user_name, req.body.user_name))
  res.send(200, { message: "Account deleted." })

})

router.put('/edit', jsonParser, authenticateToken, async (req, res) => {
  const schema = Joi.object({
    user_name: Joi.string().optional(),
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
  const { user_name } = req.query; 

  if (!user_name) {
    return res.status(400).send({ err: "Missing username parameter." });
  }

  const existingUser = await db.select().from(users).where(eq(users.user_name, user_name));

  if (existingUser.length > 0) {
    return res.status(200).send({
      user_name: existingUser[0].user_name,
      name: existingUser[0].name,
      email: existingUser[0].email
    });
  }

  return res.status(400).send({ err: "Username does not exist." });
});
router.post('/search', jsonParser ,async(req,res)=>{
  const existingUser = await db.select().from(users).where(like(users.user_name,`%${req.body.user_name}%`) && eq(users.deleted,0))
  if(existingUser.length>0){
    existingUser.map((user)=>{
      delete user.password
    })
    return res.send(200,existingUser)
  }
  res.send(400,req.body)
    return
})

router.post('/follow', jsonParser, authenticateToken, async (req, res) => {
  const followingUser = await db.select().from(users).where(eq(users.user_name, req.body.user_name))
  await db.insert(follow).values(
    [{
      follower_id: req.user.id,
      following_id: followingUser[0].id
    }])
  res.status(200).send({ message: "Following." })

})

router.put('/unfollow', jsonParser, authenticateToken, async (req, res) => {
  const followingUser = await db.select().from(users).where(eq(users.user_name, req.body.user_name))
  await db.delete(follow).where(and(
    eq(follow.follower_id, req.user.id),
    eq(follow.following_id, followingUser[0].id)))

  res.status(200).send({ message: "Unfollow." })
})


export default router;