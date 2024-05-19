import { category } from "../db/schema/category.js"
import { eq, like } from 'drizzle-orm';
import { db } from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Joi from 'joi';

import jwt from 'jsonwebtoken'
const router = express.Router();
const jsonParser = bodyParser.json()
import { authenticateToken, authenticateAdmin } from "../middleware/auth.js"
import { course, users } from "../db/schema/schema.js";

router.post('/category', authenticateToken, authenticateAdmin, jsonParser, async (req, res) => {

  const schema = Joi.object({
    name: Joi.string().required()
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
  const existingCategory = await db.select().from(category).where(eq(category.name, req.body.name));
  if (existingCategory.length > 0) {
    res.status(400).send({ err: "Category already exists." })
    return
  }
  await db.insert(category).values(
    [{
      name: req.body.name,
      deleted: 0
    }]
  );
  res.status(200).send({ message: "Category made." });
})


router.delete('/category', authenticateToken, authenticateAdmin, jsonParser, async (req, res) => {
  const existingCategory = await db.select().from(category).where(eq(category.id, req.body.id));
  if (existingCategory.length <= 0) {
    res.status(400).send({ err: "Category does not exist." })
    return
  }
  await db.update(category).set({ deleted: '1' }).where(eq(category.name, req.body.name))
  res.status(200).send({ message: "Category deleted." })

})

router.get('/requests', authenticateToken, authenticateAdmin, async (req, res) => {
  const reqests = await db.select().from(users).where(eq(users.is_active, 0))
  res.status(200).send(reqests)
})
router.post('/requests/search', authenticateToken, authenticateAdmin, jsonParser, async (req, res) => {
  const reqests = await db.select().from(users).where(eq(users.is_active, 0) && like(users.username, req.body.username))
  if (existingUser.length > 0) {
    existingUser.map((user) => {
      delete user.password
    })
  }
  res.status(200).send(reqests)
})
router.post('/requests/accept', authenticateToken, authenticateAdmin, jsonParser, async (req, res) => {
  const existingUser = await db.select().from(users).where(eq(users.id, req.body.id))
  if (existingUser.length <= 0) {
    res.status(400).send({ err: "User does not exist." })
    return
  }
  await db.update(users).set({ is_active: '1' }).where(eq(users.id, req.body.id))
  res.status(200).send({ ...existingUser[0], is_active: 1 })
})
router.post('/ban', authenticateToken, authenticateAdmin, jsonParser, async (req, res) => {
  const existingUser = await db.select().from(users).where(eq(users.id, req.body.id))
  if (existingUser.length <= 0) {
    res.status(400).send({ err: "User does not exist." })
    return
  }
  await db.update(users).set({ is_active: '0' }).where(eq(users.id, req.body.id))
  res.status(200).send({ ...existingUser[0], is_active: 0 })
})

export default router;
