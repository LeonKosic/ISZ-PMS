import jwt from 'jsonwebtoken'


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
export function authenticateAdmin(req, res, next) {
  if(req.user.role_id==0) next()
  res.sendStatus(401);
}
export function authenticateTeacher(req, res, next) {
  
  if(req.user.role_id==2) next()
    res.sendStatus(401);
}

