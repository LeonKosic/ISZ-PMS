import { relations } from "drizzle-orm";
import { users } from "../users.js";
import { notification } from "../notification.js";

export const notificationRelations = relations(notification,({many,one})=>({
    recipient:one(users,{fields:[notification.user_id],references:[users.id]}),
    notifications: many(notification, { fields: ['contents'] })
}))