import { relations } from "drizzle-orm";
import { requests } from "../schema.js";
import { roles } from "../roles.js";

export const requestsRelations = relations(requests,({one})=>({
    role:one(roles,{fields:[requests.role_id],references:[roles.role_id]}),
    
}))