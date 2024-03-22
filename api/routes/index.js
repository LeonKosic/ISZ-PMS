import express from 'express';
import {db} from '../db/db.js';
import {users} from '../db/schema/users.js';


const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const result = await db.select().from(users);
  console.log(result);
  res.status(200).send("Hello world");
});

export default router;
