import { useLocation } from "@solidjs/router"
import api from "../api/api"
import { createResource, createSignal } from "solid-js";
import CourseCard from "../components/generic/course/CourseCard";
import UserList from "../components/generic/user/UserList"
import PostList from "../components/generic/post/PostList";
import { Button, Container, Dialog, DialogContent, DialogTitle, Input, Stack } from "@suid/material";
import { testUserDetails, userDetails } from "../api/stores";
import KickParticipantField from "../components/course/KickParticipantField";
import AddTeachersField from "../components/course/AddTeachersField";
import RemoveTeachersField from "../components/course/RemoveTeachersField";

const getCourseInformation = async (id) => {
  // 1: get
  const response = await api.get(`/course?id=${id}`)
  
  // 2: post -> kako kreirati na ovom endpointu?
  // const response = await api.post(`/course`, {
  //   id: id
  // })
  
  return response.data;
} 

const getTeachers = (participants) => {
  var teachers = []
  
  participants.forEach(p => {
    if (p.isTeacher == true) teachers.push({ name: p.name })
  })
  
  return teachers
} 


export default function Course(props) {
  const courseID = useLocation().pathname.split('/')[2]
  const [course] = createResource(async () => getCourseInformation(courseID))
  
  const isOwner = () => course().ownerID == userDetails.id;
  
  // TypeError: undefined (reading 'modals') kada dijalog bude van ove komponente? nmg skontati ndms 3:04 je
  const [editDialogOpen, setEditDialogOpen] = createSignal(false);
  const editDialogHandler = () => {
    setEditDialogOpen(!editDialogOpen())
  }
  
  const [courseName, setCourseName] = createSignal(course().name)
  const [coursePassword, setCoursePassword] = createSignal('')
  const [coursePasswordConfirm, setCoursePasswordConfirm] = createSignal('')
  
  const submitCourseChanges = async () => {
    setCourseName(document.querySelector("#nameInput").value)
    setCoursePassword(document.querySelector("#passwordInput").value)
    setCoursePasswordConfirm(document.querySelector("#passwordConfirmInput").value)
    
    const response = await api.put(
      '/course',
      {
        id: courseID,
        name: courseName(),
        password: coursePassword(),
        confirmPassword: coursePasswordConfirm()
      }
    )
  }
  
  return (
    <div class="max-w-screen-xl mx-auto mt-8">
      <Stack direction="row">
        <Container class="mt-2 pt-1">
          <Stack direction="column" spacing={2}>
              <CourseCard
                name={course().name}
                about={course().about}
                style={"border-2 border-accent-700 rounded-lg max-w-2 py-3"}
              />
              
            <Show when={isOwner()} class="py-2">
              <Button
                color="pmsScheme"
                class="h-auto"
                onClick={editDialogHandler}
              >
                Edit course
              </Button>
              
              <Dialog open={editDialogOpen()} class="bg-primary-300 bg-opacity-50">
                <DialogTitle>{course().name}</DialogTitle>
                
                <DialogContent>
                  <Stack direction="column" gap={2}>
                    <Input 
                      placeholder={courseName()}
                      type="text"
                      id="nameInput"
                    />
                    
                    <Input 
                      placeholder="New password..."
                      type="text"
                      id="passwordInput"
                    />
                    
                    <Input 
                      placeholder="Confirm password..."
                      type="text"
                      id="passwordConfirmInput"
                    />
                    
                    <KickParticipantField
                      courseID={courseID}
                      users={course().participants}
                    />
                    
                    <AddTeachersField
                      courseID={courseID}
                    />
                    
                    <RemoveTeachersField
                      courseID={courseID}
                      teachers={getTeachers(course().participants)}
                    />
                    
                    <Stack
                      direction="row"
                      spacing={2}
                      class="flex flex-row items-center justify-center"
                    >
                      <Button
                        color="monochrome"
                        onClick={() =>
                          {
                            submitCourseChanges({
                              name: courseName(),
                              password1: coursePassword(),
                              password2: coursePasswordConfirm()
                            })
                          }
                        }
                      >
                        Confirm
                      </Button>
                      
                      <Button
                        color="monochrome"
                        onClick={editDialogHandler}
                      >
                        Close
                      </Button>
                    </Stack>
                  </Stack>
                </DialogContent>
              </Dialog>
            </Show>
            
            <div class="border-2 border-accent-700 pr-2 py-2 my-2 rounded-lg">
              <p class="text-medium flex flex-row items-center justify-center pb-2"> Teachers </p>
              <hr class="separator w-2/3 mx-auto opacity-75 pb-3" />
              <div class="overflow-auto max-h-52">
                <UserList
                  class=""
                  users={getTeachers(course().participants)}
                  cardStyle={"overflow-auto max-h-52 my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"}
                  />
              </div>
            </div>
            
            <div class="border-2 border-accent-700 pr-2 py-2 my-2 rounded-lg">
              <p class="text-medium flex flex-row items-center justify-center pb-2"> Participants </p>
              <hr class="separator w-2/3 mx-auto opacity-75 pb-3" />
              <div class="overflow-auto max-h-80">
                <UserList
                  users={course().participants}
                  cardStyle={"my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"}
                  highlightCard={false}
                  />
              </div>
            </div>
          </Stack>
        </Container>
      
        <PostList
          posts={course().posts}
          style=""
          cardStyle="border-2 border-accent-700 rounded-lg my-3"
        />
      </Stack>
    </div>
  )
}