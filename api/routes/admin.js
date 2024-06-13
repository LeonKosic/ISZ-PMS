import { category } from "../db/schema/category.js"
import { and, eq, like } from 'drizzle-orm';
import { db } from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';

import jwt from 'jsonwebtoken'
const router = express.Router();
const jsonParser = bodyParser.json()
import {authenticateToken} from "../middleware/auth.js"

router.post('/create', authenticateToken, jsonParser, async (req, res) => {

  const existingCategory = await db.select().from(category).where(eq(category.category_name, req.body.category_name));
  if (existingCategory.length > 0) {
    res.status(400).send({ err: "Category already exists." })
    return
  }
  await db.insert(category).values(
    [{
      category_name: req.body.category_name,
      deleted: 0
    }]
  );

  res.status(200).send({ message: "Category made." });
})


router.put('/delete', jsonParser, async (req, res) => {
  const existingCategory = await db.select().from(category).where(eq(category.category_name, req.body.category_name));
  if (existingCategory.length <= 0) {
    res.status(400).send({ err: "Category does not exist." })
    return
  }
  await db.update(category).set({ deleted: '1' }).where(eq(category.category_name, req.body.category_name))
  res.status(200).send({ message: "Category deleted." })

})

router.get('/requests', authenticateToken, authenticateAdmin, async (req, res) => {
  const reqests = await db.select().from(users).where(eq(users.is_active, 0))
  res.status(200).send(reqests)
})
router.post('/requests/search', authenticateToken, authenticateAdmin, jsonParser, async (req, res) => {
  const reqests = await db.select().from(users).where(and(eq(users.is_active, 0), like(users.username, req.body.username)))
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
