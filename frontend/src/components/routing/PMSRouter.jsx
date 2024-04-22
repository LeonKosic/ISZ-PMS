import { Route, Router } from "@solidjs/router";
import Login from "../../pages/login.jsx";
import Profile from "../../pages/profile.jsx";
import Register from "../../pages/register.jsx";
import NotFound from "../../pages/notFound.jsx";
import Admin from "../../pages/admin.jsx";

export default function PMSRouter() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profiles/:id" component={Profile} />
      
      <Route path="/pms-admin" component={Admin}/>
      
      <Route path="*" component={NotFound}/>
    </Router>
  )
}