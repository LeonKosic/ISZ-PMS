import { Routes, Route } from "@solidjs/router";
import { Login, Register, About, Contact, Landing, NotFound } from '../../pages'
import { Users, User, Repository, Community, CommunityProjects } from '../../pages'
import { Courses, Course, MessageBoard, ProjectRequests, ProjectRequest } from '../../pages'

// breaks all for some reason, needs a refresh to load component properly
// const Users = lazy(() => import('~/pages/users'));

export default function RouterMain() {
  return (
      <Routes>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" component={Contact} />
        
        <Route path="/users" component={Users}/>
        <Route path="/users/:id" component={User}/>
        <Route path="/users/:id/:repo" component={Repository} />
        
        <Route path="/courses" component={Courses} />
        <Route path="/courses/:id" component={Course} />
        
        <Route path="/community" component={Community} />
        <Route path="/community/projects" component={CommunityProjects} />
        <Route path="/community/requests" component={ProjectRequests} />
        <Route path="/community/requests/:id" component={ProjectRequest} />
        <Route path="/community/messageboard" component={MessageBoard} />
        
        <Route path="*" component={NotFound}/>
      </Routes>
  )
}