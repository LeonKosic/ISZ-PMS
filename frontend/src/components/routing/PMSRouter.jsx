import { Route, Router } from "@solidjs/router";
import Login from "~/pages/Login";
import NotFound from "~/pages/NotFound";
import Profile from "~/pages/Profile";
import Register from "~/pages/Register";

export default function PMSRouter() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profiles/:id" component={Profile} />
      <Route path="*" component={NotFound}/>
    </Router>
  )
}