import { Routes, Route } from "@solidjs/router";
import { Login, Register, Landing, NotFound } from '../../pages'


export default function RouterMain() {
  return (
      <Routes>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        
        {/* za dinamicke rute koristi ':[string]' identifikatore: */}
        {/* <Route path="/users/:id/:repo" component={Repository} /> */}
        
        <Route path="*" component={NotFound}/>
      </Routes>
  )
}