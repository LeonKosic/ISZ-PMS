
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'
const router = express.Router();
const jsonParser = bodyParser.json()


export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.send(req.headers)
  
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      
  
      if (err) return res.send(token, 403)
     
  
      req.user = user
  
      next()
    })
}
  