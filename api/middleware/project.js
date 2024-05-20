import { db } from "../db/db";
import { project_members } from "../db/schema/project_members";

export function checkIfTeamMember(req, res, next) {
  const result = db.select().from(project_members).where({ user_id: req.user.id, project_id: req.body.project_id })
  const project = db.select().from(project).where({ id: req.body.project_id })
    if (result.length > 0 || req.user.id == project.owner_id) {
        next()
    }else{
        res.status(403).send({err:"User is not a team member."})
    }
}