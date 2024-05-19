import { Route, Router } from "@solidjs/router";

import Login from "../../pages/Login.jsx";
import Landing from "../../pages/Landing.jsx"
import Profile from "../../pages/Profile.jsx";
import Register from "../../pages/Register.jsx";
import NotFound from "../../pages/NotFound.jsx";
import Courses from "../../pages/Courses.jsx";
import Course from "../../pages/Course.jsx";
import Project from "../../pages/Project.jsx";

export default function PMSRouter() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profiles/:id" component={Profile} />
      <Route path="/landing" component={Landing} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={Course} />
      <Route path="/projects/:id" component={Project} />
      
      <Route path="*" component={NotFound}/>
    </Router>
  )
}
