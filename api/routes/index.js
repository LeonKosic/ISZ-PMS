import express from 'express';
import {db} from '../db/db.js';
import {users} from '../db/schema/users.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import axios from 'axios';
import { commit } from '../db/schema/commit.js';
import { project } from '../db/schema/project.js';
import { commited_files } from '../db/schema/commited_files.js';
import { file } from '../db/schema/file.js';

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
  console.log("projectId", req.body)
  const newCommit = await db.insert(commit).values({project:req.body.projectId});
  db.update(project).set({head:newCommit[0].insertId}).where({id:req.body.projectId})
  await axios.post("http://filesystem:7070/upload/"+newCommit[0].insertId, req.files, {headers:{"Content-Type":'multipart/form-data'}}).then(async (response)=>{
    console.log("data", response.data.arr)
    console.log("headers ", response.headers)
    const projectId = response.data.arr[0]
    response.data.arr.slice(1);
    console.log("length", response.data.arr.length)
    for (let tmp of response.data.arr){
      console.log("tmp", tmp, projectId, newCommit[0].insertId)
      
      await db.insert(file).values([{path:"/"+tmp, project:projectId, parent:null, isDeleted:0}])
    }
    res.status("203").send("now good g")
  })


})

export default router;
