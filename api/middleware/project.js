import { db } from "../db/db.js";
import { project_members } from "../db/schema/project_members.js";
import { project } from "../db/schema/project.js";
import { post } from "../db/schema/post.js";
import { eq } from "drizzle-orm";

export function checkIfTeamMember(req, res, next) {
  const result = db.select().from(project_members).where({ user_id: req.user.id, project_id: req.body.project_id })
  const targetProject = db.select().from(project).where({ id: req.body.project_id })
    if (result.length > 0 || req.user.id == targetProject[0].owner_id) {
        next()
    }else{
        res.status(403).send({err:"User is not a team member."})
    }
}
export async function checkIfBoardMember(req, res, next) {
    console.log(req.params.id)
    const targetProject = await db.select().from(post).where(eq(post.board_id, req.params.id))
    const result = db.select().from(project_members).where({ user_id: req.user.id, project_id: targetProject[0].id })

      if (result.length > 0 || req.user.id == targetProject[0].owner_id) {
          next()
      }else{
          res.status(403).send({err:"User is not a team member."})
      }
  }