import { relations } from "drizzle-orm";
import { users } from "../users.js";
import { roles } from "../roles.js";

export const roleRelations = relations(roles,({many})=>({
   
    members:many(users),
    
}))