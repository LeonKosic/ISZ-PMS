import jwt from 'jsonwebtoken';
import {db} from '../db/db.js';
import { users} from '../db/schema/users.js';

export async function authenticateAdmin (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) return res.sendStatus(403);

        var isAdmin= await db.select().from(users).where(eq(users.id,req.user.id));
            if (err || !isAdmin.length) return res.sendStatus(403);

            if (isAdmin[0].role_id !== 0) {
                return res.sendStatus(403);
            }

            req.user = isAdmin[0];
            next();
        });
    }
    
