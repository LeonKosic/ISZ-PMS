import express from 'express';
import {db} from '../db/db.js';
import {users} from '../db/schema/users.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import axios from 'axios';

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
  console.log(axios.post("http://filesystem:7070/upload/11", req.files, {headers:{"Content-Type":'multipart/form-data'}}))
  res.status("203").send("now good g")
})

export default router;
