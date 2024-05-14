import express from 'express';
import {db} from '../db/db.js';
import {users} from '../db/schema/users.js';
import bodyParser from 'body-parser';
import multer from 'multer';

const router = express.Router();
const jsonParser = bodyParser.json()
const upload = multer();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const result = await db.select().from(users);
  console.log(result);
  res.status(200).send("Hello world");
});
router.post("/", jsonParser,upload.any(), async (req, res, next)=>{
  console.log(req.body)
  if(req.body.idk == "hello"){
    res.status(200).send("hello world")
  }
  res.status("203").send("now good g")
})

export default router;
