import { Route, Router } from "@solidjs/router";
import Login from "../../pages/Login.jsx";
import Profile from "../../pages/Profile.jsx";
import Register from "../../pages/Register.jsx";
import NotFound from "../../pages/NotFound.jsx";
import AdminPanel from "../admin/AdminPanel.jsx";
import DevUpload from "../../pages/devUpload.jsx";

export default function PMSRouter() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profiles/:id" component={Profile} />
      
      <Route path="/pms-admin" component={AdminPanel}/>
      
      {/* DEV, TODO: REMOVE AS SOON AS POSSIBLE */}
      <Route path="/upload" component={DevUpload} />
      
      <Route path="*" component={NotFound}/>
    </Router>
  )
}