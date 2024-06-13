import CourseTeachers from "./CourseTeachers"
import PostList from "../generic/post/PostList"
import { Button } from "@suid/material"
import { For, Show, createSignal } from "solid-js"
import api from "../../api/api"
import UserList from "../generic/user/UserList"
import UserCard from "../generic/user/UserCard"

const isOwner = (ownerID) => {
  return (localStorage.getItem("user_id") == ownerID)
}

const addPost = async (id) => {

}

const searchTeachers = async (name) => {
  const response = await api.post(
    '/users/search',
    {
      username: name
    }
  )

  return response.data;
}

const addTeacher = async (teacherID, courseID) => {
  console.log(teacherID, courseID)

  const response = await api.post(
    '/course/teacher',
    {
      course_id: courseID,
      teacher_id: teacherID
    }
  )

  return response.statusText;
}

const deleteTeacher = async (teacherID) => {
  const respones = await api.delete(
    `/course/teacher/${teacherID}`
  )

  return response.statusText;
}

const deleteCourse = async (courseID) => {
  const response = await api.delete(
    `/course/delete/${courseID}`
  )
  return response.statusText;
}

export default function EnrolledCourse(props) {
  // Add post button components
  const [showPostModal, setShowPostModal] = createSignal(null)
  const [postTitle, setPostTitle] = createSignal('')
  const [postBody, setPostBody] = createSignal('')

  // Edit course button components
  const [showEditModal, setShowEditModal] = createSignal(false)
  const [teachers, setTeachers] = createSignal(props.data.teachers)
  const [teachersSearch, setTeacherSearch] = createSignal([])

  console.log(props)

  return (
    <div class="mx-auto py-10 border-2 border-accent-600 rounded-xl max-w-screen-2xl my-4">
      <div class="flex flex-row items-center justify-center">
        <div class="flex flex-col items-center justify-center w-full">
          <p class="text-4xl pb-2">
            {props.data.name}
          </p>

          <p class="text-lg italic pb-2">
            {"About this course..."}
          </p>

          <hr class="w-2/3 border-2 border-accent-600" />

          <Show when={isOwner(props.data.owner_id)}>
            <Button
              color="pmsScheme"
              variant="outlined"
              onClick={() => { setShowEditModal(true) }}
            >
              Edit course
            </Button>

            <Show when={showEditModal() == true}>
              <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
                <div class="bg-primary-400 pl-14 pr-14 pb-14 rounded-3xl shadow-md w-full max-w-lg">
                  <div class="flex flex-row items-center justify-center pt-8">
                    <p class="text-3xl text-bold pb-8">
                      Edit {props.data.name}
                    </p>
                  </div>

                  <div class="grid grid-flow-row grid-cols-1 gap-6">
                    {/* post   /course/teacher */}
                    <div class="flex flex-col items-center justify-center gap-2">
                      <p class="text-xl italic">Add a teacher</p>
                      <input
                        type="text"
                        placeholder="Teacher"
                        class="form-input mt-1 p-2 block w-full border-white rounded-md placeholder-primary text-primary bg-accent-200 bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 duration-300 transition-all"
                        onChange={async (ev) => {
                          const result = await searchTeachers(ev.target.value);
                          setTeacherSearch(result)
                        }}
                      />

                      <Show when={teachers().length}>
                        <For each={teachers()}>
                          {
                            (t) =>
                              <UserCard
                                userid={t.id}
                                username={t.username}
                                role={() => {
                                  if (t.role_id == 3)
                                    return "Student"
                                  else if (t.role_id == 2)
                                    return "Teacher"
                                  else return "Admin"
                                }}
                                name={t.name}
                                cardStyle="border-2 border-accent-600 rounded-lg hover:bg-accent-600 duration-300 transition-all hover:cursor-pointer w-full"
                                clickAction={(id) => { addTeacher(id, props.data.id) }}
                              />
                          }
                        </For>
                      </Show>
                    </div>
                    <hr class="border-2 border-accent-600 rounded-lg w-full" />

                    {/* delete /course/teacher/:id */}
                    <div class="flex flex-col items-center justify-center gap-2">
                      <p class="text-xl italic">Delete a teacher</p>

                      <Show
                        when={teachers()}
                        fallback={<p class="italic">No teachers in this course.</p>}
                      >
                        <For each={teachers()}>
                          {
                            (t) =>
                              <UserCard
                                userid={t.id}
                                username={t.username}
                                role={() => {
                                  if (t.role_id == 3)
                                    return "Student"
                                  else if (t.role_id == 2)
                                    return "Teacher"
                                  else return "Admin"
                                }}
                                name={t.name}
                                cardStyle="border-2 border-accent-600 rounded-lg hover:bg-accent-600 duration-300 transition-all hover:cursor-pointer w-full"
                                clickAction={(id) => { (id, props.data.id) }}
                              />
                          }
                        </For>
                      </Show>
                    </div>

                    <hr class="border-2 border-accent-600 rounded-lg w-full" />
                    {/* delete /course/:id */}
                    <Button
                      variant="outlined"
                      color="pmsScheme"
                      onClick={() => { deleteCourse(props.data.id) }}
                    >
                      Delete course
                    </Button>

                    <hr class="border-2 border-accent-600 rounded-lg w-full my-2" />
                    <Button
                      variant="outlined"
                      color="pmsScheme"
                      onClick={() => { setShowEditModal(false) }}
                    >
                      Exit
                    </Button>
                  </div>
                </div>
              </div>
            </Show>
          </Show>

          <CourseTeachers data={props.data.teachers} />
        </div>

        <div class="w-full">
          <div class="flex flex-col items-center justify-center">
            <p class="text-2xl pb-2 mt-14 italic">
              Recent posts
            </p>
            <hr class="w-2/3 border-2 border-accent-600" />

            <div class="pt-2">
              <Button
                variant="outlined"
                color="pmsScheme"
                onClick={() => { setShowPostModal(true) }}
              >
                Add post
              </Button>
            </div>
          </div>

          <Show when={showPostModal() == true}>

          </Show>

          <PostList
            data={props.data.content}
          />
        </div>
      </div>
    </div>
  )
}