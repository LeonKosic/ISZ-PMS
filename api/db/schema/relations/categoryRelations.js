import { relations } from "drizzle-orm";
import { category } from "../category.js";
import { project } from "../project.js";
import { project_category } from "../project_category.js";

export const categoryRelations = relations(project_category,({many})=>({
    category_id:many(category, {fields:[project_category.category_id],references:[category.id]}),
    project_id:many(project, {fields:[project_category.project_id],references:[project.id]})

}));