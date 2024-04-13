import {users} from "./users.js"
import {follow} from "./follow.js"
import relations from "./relations/relations.js";


export {users, follow}
export default {users, follow, ...relations};
