import { relations } from "drizzle-orm";
import { users } from "../users.js";
import { follow } from "../follow.js";
import { roles } from "../roles.js";

export const userRelations = relations(users,({many,one})=>({
    followers:many(follow, {relationName:"follower",foreignKey:"followed_id"}),
    following:many(follow, {relationName:"follower",foreignKey:"follower_id"}),
    role:one(roles,{fields:[users.role_id],references:[roles.role_id]}),
    
}))