import {users} from "../db/schema/users.js"
import { Name,eq } from 'drizzle-orm';
import {db} from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Joi from 'joi'
import jwt from 'jsonwebtoken'
const router = express.Router();
const jsonParser = bodyParser.json()

  function generateAccessToken(user) {
  
    const secret = process.env.JWT_KEY;
    const options = { expiresIn: '1h' };
  
    return jwt.sign(user, secret, options);
  }
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.send(req.headers)
  
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      
  
      if (err) return res.send(token, 403)
     
  
      req.user = user
  
      next()
    })
  }
  router.post('/login',jsonParser, async (req, res) => {

  const existingUser = await db.select().from(users).where(eq(users.user_name,req.body.user_name));
  if (existingUser.length <= 0) {
    res.send(400,{err:"Username does not exists."})
    return
  }
  const passwordMatch = await bcrypt.compare(req.body.password, existingUser[0].password);

        if (passwordMatch) {
            const accessToken = generateAccessToken(existingUser[0]);
            return res.status(200).json({ accessToken });
        }
    
    return res.status(401).json({ err:"Wrong password." });
});

router.post('/register',jsonParser,async(req,res)=>{

  const schema = Joi.object({
    user_name: Joi.string().required(),
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    password: Joi.string().required(),
    password2: Joi.string().required()
});
const options={
  errors: {
    wrap: {
      label: false
    }
  }
}
const { error, value } = schema.validate(req.body,options);

if (error) {
  res.send(400,{err:error.details})
  return
}

  const existingUser = await db.select().from(users).where(eq(users.user_name,req.body.user_name));
  if (existingUser.length > 0) {
    res.send(400,{err:"Username already exists."})
    return
  }
  if(req.body.password!=req.body.password2){
    res.send(400,{err:"Passwords do not match."})
    return
  }
  const hash =  await bcrypt.hash(req.body.password,10);
  await db.insert(users).values(
    [{user_name: req.body.user_name,
    name: req.body.name,
    email: req.body.email,
    password: hash,
    deleted: 0
  }]
);
  
        res.send(200, {message:"Account registered."})
})


  router.put('/delete',jsonParser,async(req,res)=>{
    const existingUser = await db.select().from(users).where(eq(users.user_name,req.body.user_name));
  if (existingUser.length <= 0) {
    res.send(400,{err:"Username does not exist."})
    return
  }
    await db.update(users).set({deleted: '1'}).where(eq(users.user_name,req.body.user_name))
    res.send(200,{message:"Account deleted."})

  })

  router.put('/edit', jsonParser, authenticateToken, async (req, res) => {
    const schema = Joi.object({
        user_name: Joi.string().optional(),
        name: Joi.string().optional(),
        email: Joi.string().email().optional()
    });

    const { error, value } = schema.validate(req.body);
   
      if(error){
        res.status(200).json({ message: 'Data is not valid.' });
        return
      }
       const result=await db.update(users).set(req.body).where(eq(users.id,req.user.id))
        return res.status(200).json(result);
});

router.get('/details',jsonParser,async(req,res)=>{
  const existingUser = await db.select().from(users).where(eq(users.user_name,req.body.user_name))
  
  if(existingUser.length>0){
    return res.send(200,{
      user_name:existingUser[0].user_name,
      name:existingUser[0].name,
      email:existingUser[0].email})
  }
  res.send(400,{err:"Username does not exist."})
    return

})

export default router;