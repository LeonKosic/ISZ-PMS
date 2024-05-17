import {users} from "./users.js"
import {follow} from "./follow.js"
import {roles} from "./roles.js"
import { category } from "./category.js";
import { project } from "./project.js";
import { course } from "./course.js";
import { userRelations } from "./relations/userRelations.js";
import { followRelations } from "./relations/followRelations.js";
import { roleRelations } from "./relations/roleRelations.js";
import { categoryRelations } from "./relations/categoryRelations.js";
import { project_category } from "./project_category.js";
import { notification } from "./notification.js";
import { notificationRelations } from "./relations/notificationRelations.js";
import { partners } from "./partners.js";
import { courseRelations} from "./relations/courseRelations.js";
import { enrolled } from "./enrolled.js";
import { course_teachers } from "./course_teachers.js";
import { course_teachersRelations } from "./relations/course_teachersRelations.js";


export {users,course_teachers,course_teachersRelations, follow, roles,enrolled,category,course,project,notification,partners,courseRelations,notificationRelations,project_category,userRelations, followRelations, roleRelations,categoryRelations}
export default{users,course_teachers,course_teachersRelations, follow,enrolled, roles,category,course,project,notification,partners,courseRelations,notificationRelations,project_category, userRelations, followRelations, roleRelations,categoryRelations}

