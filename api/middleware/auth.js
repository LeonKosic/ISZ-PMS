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
  if(req.user.role_id==1) {next()}
  else{
  res.sendStatus(401);
  }
}
export function authenticateTeacher(req, res, next) {
  console.log(req.user.role_id)
  if(req.user.role_id==3){ next()}
  else{
    res.sendStatus(401);

  }
}

