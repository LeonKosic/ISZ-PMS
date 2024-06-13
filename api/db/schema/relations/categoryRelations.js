import { relations } from "drizzle-orm";
import { category } from "../category.js";
import { post } from "../post.js";
import { post_category } from "../post_category.js";

export const categoryRelations = relations(post_category,({many})=>({
    category_id:many(category, {fields:[post_category.category_id],references:[category.id]}),
    post_id:many(post, {fields:[post_category.post_id],references:[post.id]})

}));