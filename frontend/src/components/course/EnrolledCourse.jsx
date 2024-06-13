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

const addPost = async (courseID, postTitle, postBody) => {
  const response = await api.post(
    `/course/post`,
    {
      course_id: courseID,
      title: postTitle,
      body: postBody
    }
  )

  return response.statusText;
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
  const response = await api.post(
    '/course/teacher',
    {
      course_id: courseID,
      teacher_id: teacherID
    }
  )

  return response.statusText;
}

const deleteTeacher = async (teacherID, courseID) => {
  const response = await api.post(
    `/course/teacher/remove`,
    {
      course_id: courseID,
      teacher_id: teacherID
    }
  )

  return response.statusText;
}

const deleteCourse = async (courseID) => {
  const response = await api.delete(
    `/course/${courseID}`
  )

  window.location.href = `/courses`
  setTimeout(() => { location.reload() }, 1000)
}

export default function EnrolledCourse(props) {
  // Add post button components
  const [showPostModal, setShowPostModal] = createSignal(null)
  const [postTitle, setPostTitle] = createSignal('')
  const [postBody, setPostBody] = createSignal('')
  const [postWarning, setPostWarning] = createSignal(null)

  // Edit course button components
  const [showEditModal, setShowEditModal] = createSignal(false)
  const [teachers, setTeachers] = createSignal(props.data.teachers)
  const [teachersSearch, setTeachersSearch] = createSignal([])


  return (
    <div class="mx-auto py-10 border-2 border-accent-600 rounded-xl max-w-screen-2xl my-4">
      <div class="flex flex-row items-center justify-center">
        <div class="flex flex-col items-center justify-center w-1/2">
          <p class="text-4xl pb-2">
            {props.data.name}
          </p>

          <p class="text-lg italic pb-2">
            {"About this course..."}
          </p>

          <hr class="w-2/3 border-2 border-accent-600" />

          <Show when={isOwner(props.data.owner_id)}>
            <div class="my-4">
              <Button
                class="h-12 my-4 w-44"
                color="pmsScheme"
                variant="outlined"
                onClick={() => { setShowEditModal(true) }}
              >
                Edit course
              </Button>
            </div>

            <Show when={showEditModal() == true}>
              <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
                <div class="bg-primary-400 pl-14 pr-14 pb-14 rounded-3xl shadow-md w-full max-w-lg">
                  <div class="flex flex-row items-center justify-center pt-8">
                    <p class="text-3xl text-bold pb-8">
                      Edit {props.data.name}
                    </p>
                  </div>

                  <div class="grid grid-flow-row grid-cols-1 gap-6">
                    <div class="flex flex-col items-center justify-center gap-2">
                      <p class="text-xl italic">Add a teacher</p>
                      <input
                        type="text"
                        placeholder="Teacher"
                        class="form-input mt-1 p-2 block w-full border-white rounded-md placeholder-primary text-primary bg-accent-200 bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 duration-300 transition-all"
                        onChange={async (ev) => {
                          const result = await searchTeachers(ev.target.value);
                          setTeachersSearch(result)
                        }}
                      />

                      <Show when={teachersSearch().length > 0}>
                        <For each={teachersSearch()}>
                          {
                            (t) => {
                              let role;
                              if (t.role_id == 3)
                                role = "Student";
                              else if (t.role_id == 2)
                                role = "Teacher";
                              else role = "Admin";

                              return <UserCard
                                userid={t.id}
                                username={t.username}
                                showUsername={true}
                                role={role}
                                showRole={true}
                                name={t.name}
                                cardStyle="border-2 border-accent-600 rounded-lg hover:bg-accent-600 duration-300 transition-all hover:cursor-pointer w-full"
                                clickAction={(id) => { addTeacher(id, props.data.id) }}
                              />
                            }
                          }
                        </For>
                      </Show>
                    </div>
                    <hr class="border-2 border-accent-600 rounded-lg w-full" />

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
                                showUsername={true}
                                name={t.name}
                                cardStyle="border-2 border-accent-600 rounded-lg hover:bg-accent-600 duration-300 transition-all hover:cursor-pointer w-full"
                                clickAction={(id) => { deleteTeacher(id, props.data.id) }}
                              />
                          }
                        </For>
                      </Show>
                    </div>

                    <hr class="border-2 border-accent-600 rounded-lg w-full" />
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

            <Show when={props.data.isTeacher}>
              <div class="py-2">
                <Button
                  variant="outlined"
                  color="pmsScheme"
                  onClick={() => { setShowPostModal(true) }}
                >
                  Add post
                </Button>
              </div>

              <hr class="w-2/3 border-2 border-accent-600 mb-2" />
            </Show>
          </div>

          <Show when={showPostModal() == true}>
            <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
              <div class="bg-primary-400 pl-14 pr-14 pb-14 rounded-3xl shadow-md w-full max-w-lg">
                <div class="flex flex-row items-center justify-center mt-14">
                  <p class="text-2xl">Post to {props.data.name}</p>
                </div>

                <div>
                  <p class="text-xl py-2">Title</p>
                  <input
                    id="id-post-title"
                    type="text"
                    value={postTitle()}
                    placeholder="Title"
                    class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
                    onChange={(ev) => { setPostTitle(ev.target.value) }}

                    required
                  />
                </div>

                <div>
                  <p class="text-xl py-2">Body</p>
                  <input
                    id="id-post-title"
                    type="text"
                    value={postBody()}
                    placeholder="Body"
                    class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
                    onChange={(ev) => { setPostBody(ev.target.value) }}

                    required
                  />
                </div>

                <div class="grid grid-flow-row grid-cols-2 gap-4 items-center justify-between my-4">
                  <Button
                    variant="outlined"
                    color="pmsScheme"
                    onClick={() => {
                      addPost(props.data.id, postTitle(), postBody())
                      setTimeout(() => { setShowPostModal(false) }, 500)
                    }}
                  >
                    Submit
                  </Button>

                  <Button
                    variant="outlined"
                    color="pmsScheme"
                    onClick={() => { setShowPostModal(false) }}
                  >
                    Exit
                  </Button>
                </div>

                <Show when={postWarning() != null}>
                  <div class="flex flex-row items-center justify-center">
                    <p class="text-red-400 italic text-lg">
                      {postWarning()}
                    </p>

                    {setTimeout(() => { setPostWarning(null) }, 2000)}
                  </div>
                </Show>
              </div>
            </div>
          </Show>

          <PostList
            data={props.data.content}
          />
        </div>
      </div>
    </div>
  )
}