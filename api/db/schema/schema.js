import { users } from "./users.js"
import { follow } from "./follow.js"
import { roles } from "./roles.js"
import { category } from "./category.js";
import { project } from "./project.js";
import { course } from "./course.js";
import { userRelations } from "./relations/userRelations.js";
import { followRelations } from "./relations/followRelations.js";
import { roleRelations } from "./relations/roleRelations.js";
import { categoryRelations } from "./relations/categoryRelations.js";
import { post_category } from "./post_category.js";
import { notification } from "./notification.js";
import { notificationRelations } from "./relations/notificationRelations.js";
import { partners } from "./partners.js";
import { courseRelations } from "./relations/courseRelations.js";
import { enrolled } from "./enrolled.js";
import { course_teachers } from "./course_teachers.js";
import { course_teachersRelations } from "./relations/course_teachersRelations.js";
import { postRelations } from "./relations/postRelations.js";
import { post } from "./post.js";
import { board } from "./board.js";
import { like } from "./like.js";
import { request } from "./request.js";
import { project_members } from "./project_members.js";
import { request_answers } from "./request_answers.js";
import { commit } from "./commit.js";
import { file } from "./file.js";
import { commited_files } from "./commited_files.js";
import { comment } from "./comment.js";
import { message } from "./message.js";

export { users, course_teachers, course_teachersRelations, follow, roles, enrolled, category, course, project, notification, partners, courseRelations, notificationRelations, post_category, userRelations, followRelations, roleRelations, categoryRelations, postRelations, post, board, like, request, project_members,request_answers, commit, file, commited_files, comment, message}
export default { users, course_teachers, course_teachersRelations, follow, enrolled, roles, category, course, project, notification, partners, courseRelations, notificationRelations, post_category, userRelations, followRelations, roleRelations, categoryRelations, postRelations, post, board, like, request, project_members,request_answers, commit, file, commited_files, comment, message}

// , request_answers, commit, file, commited_files, comment, message 
// , request_answers, commit, file, commited_files, comment, message
