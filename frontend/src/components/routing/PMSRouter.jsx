import { Route, Router } from "@solidjs/router";

import Login from "../../pages/Login.jsx";
import Landing from "../../pages/Landing.jsx"
import Profile from "../../pages/Profile.jsx";
import Register from "../../pages/Register.jsx";
import NotFound from "../../pages/NotFound.jsx";
import Courses from "../../pages/Courses.jsx";
import Course from "../../pages/Course.jsx";
import Admin from "../../pages/Admin.jsx"
import PostPage from "../../pages/PostPage.jsx";
import ProjectPage from "../../pages/ProjectPage.jsx";

export default function PMSRouter() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profiles/:id" component={Profile} />
      <Route path="/landing" component={Landing} />
      <Route path="/admin" component={Admin} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={Course} />
      <Route path="/projects/:id" component={ProjectPage} />
      <Route path="/post/:id" component={PostPage} />

      <Route path="*" component={NotFound} />
    </Router>
  )
}
