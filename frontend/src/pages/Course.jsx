import { useLocation } from "@solidjs/router"
import api from "../api/api"
import { createResource, createSignal } from "solid-js";
import CourseCard from "../components/generic/course/CourseCard";
import UserList from "../components/user/UserList"
import PostList from "../components/generic/post/PostList";
import { Button, Container, Dialog, DialogContent, DialogTitle, Input, Stack } from "@suid/material";
import { testUserDetails, userDetails } from "../api/stores";
import KickParticipantField from "../components/course/KickParticipantField";
import AddTeachersField from "../components/course/AddTeachersField";
import RemoveTeachersField from "../components/course/RemoveTeachersField";

const getCourseInformation = async (id) => {
  // 1: get
  const response = await api.get(`/courses?id=${id}`)
  
  // 2: post -> kako kreirati onda?
  // const response = await api.post(`/courses`, {
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

const processParticipants = (participants) => {
  var participants = []
  
  participants.forEach((p) => {
    participants.push(p.name)
  })
  
  return participants
}

export default function Course(props) {
  const courseID = useLocation().pathname.split('/')[2]
  // const [course] = createResource(async () => getCourseInformation(courseID))
  
  // TODO: replace test store with corresponding store
  const isOwner = () => course().ownerID == testUserDetails.id;
  const course = () => {
    return {
      ownerID: "1",
      name: "Kriptografija i racunarska zastita",
      about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis suscipit optio ab repellendus quam quos repudiandae impedit provident?",
      participants: [
        { id: "1", username: "username1", name: "John Doe", isTeacher: true },
        { id: "2", username: "username2", name: "Jane Smith", isTeacher: false },
        { id: "3", username: "username3", name: "Bob Johnson", isTeacher: true },
        { id: "4", username: "username4", name: "Alice Williams", isTeacher: false },
        { id: "5", username: "username5", name: "Tom Brown", isTeacher: true },
        { id: "6", username: "username6", name: "Jerry Davis", isTeacher: false },
        { id: "7", username: "username7", name: "Emma Miller", isTeacher: true },
        { id: "8", username: "username8", name: "Oliver Wilson", isTeacher: false },
        { id: "9", username: "username9", name: "Sophia Moore", isTeacher: true },
        { id: "10", username: "username10", name: "Mia Taylor", isTeacher: false },
        { id: "11", username: "username11", name: "Lucas Anderson", isTeacher: true },
        { id: "12", username: "username12", name: "Ethan Thomas", isTeacher: false },
      ],
      posts: [
        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },
        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },
        {
          title: "test post title",
          postedBy: "poster",
          content: "lorem ipsum dolor sit amet"
        },
      ]
    }
  }
  
  // TypeError: undefined (reading 'modals') kada dijalog bude van ove komponente? nmg skontati ndms 3:04 je
  const [editDialogOpen, setEditDialogOpen] = createSignal(false);
  const editDialogHandler = () => {
    setEditDialogOpen(!editDialogOpen())
  }
  
  // da li ce biti proslijedjen password u tijelu odgovora?
  const [courseName, setCourseName] = createSignal(course().name)
  const [coursePassword, setCoursePassword] = createSignal('')
  const [coursePasswordConfirm, setCoursePasswordConfirm] = createSignal('')
  
  const submitCourseChanges = async () => {
    setCourseName(document.querySelector("#nameInput").value)
    setCoursePassword(document.querySelector("#passwordInput").value)
    setCoursePasswordConfirm(document.querySelector("#passwordConfirmInput").value)
    
    const response = await api.put(
      '/courses',
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
                      course={courseID}
                      users={course().participants}
                    />
                    
                    <AddTeachersField
                      course={courseID}
                    />
                    
                    <RemoveTeachersField
                      course={courseID}
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
              <hr class="separator w-2/3 mx-auto opacity-75 pb-3"/>
              <UserList
                users={getTeachers(course().participants)}
                style={"max-h-52 overflow-auto"}
              />
            </div>
            
            <div class="border-2 border-accent-700 pr-2 py-2 my-2 rounded-lg">
              <p class="text-medium flex flex-row items-center justify-center pb-2"> Participants </p>
              <hr class="separator w-2/3 mx-auto opacity-75 pb-3"/>
              <UserList
                users={course().participants}
                style={"max-h-52 overflow-auto"}
                />
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