import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'

import indexRouter from './routes/index.js';
import userRouter from './routes/users.js';
import adminRouter from './routes/admin.js';
import projectRouter from './routes/projects.js'
import courseRouter from "./routes/course.js"
import postRouter from "./routes/post.js"
import requestRouter from "./routes/request.js"

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/users',userRouter)
app.use('/admin',adminRouter);
app.use('/projects',projectRouter);
app.use('/course',courseRouter)
app.use("/post",postRouter)
app.use("/request",requestRouter)


export default app;
