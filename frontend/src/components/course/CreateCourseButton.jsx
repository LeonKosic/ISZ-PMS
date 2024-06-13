import { Button } from "@suid/material"
import { Show, createSignal } from "solid-js"
import api from "../../api/api"

const validate = (pw1, pw2) => {
  return pw1 === pw2;
}

export default function CreateCourseButton(props) {
  const [showModal, setShowModal] = createSignal(false)
  const [courseName, setCourseName] = createSignal('')
  const [coursePassword, setCoursePassword] = createSignal('')
  const [coursePassword2, setCoursePassword2] = createSignal('')
  const [warning, setWarning] = createSignal(null)

  const createCourse = async (name, password1, password2) => {
    if (!validate(password1, password2)) {
      setWarning("Passwords are not matching!");
      return;
    }

    console.log(name, password1, password2)

    const response = await api.post(
      '/course',
      {
        name: name,
        password: password1,
        password2: password2,
      }
    )

    if (response.status != 200) {
      setWarning(response.message)
    } else {
      window.location.href = `/course/${response.data.id}`
    }
  }

  return (
    <div class="items-center">
      <Button
        variant="outlined"
        color="pmsScheme"
        class="p-4 w-50 h-20 text-2xl"
        onClick={() => { setShowModal(true) }}
      >
        <div class="text-2xl">
          Create Course
        </div>
      </Button>

      <Show when={showModal()}>
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
          <div class="bg-primary-400 pl-14 pr-14 pb-14 rounded-3xl shadow-md w-full max-w-lg">
            <div class="flex flex-row items-center justify-center pt-8">
              <p class="text-3xl text-bold pb-8">
                Create a course
              </p>
            </div>
            <div class="grid grid-flow-row grid-cols-1 gap-6">
              <input
                id="id-course-name"
                type="text"
                value={courseName()}
                placeholder="Name"
                class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-75 focus:bg-opacity-100"
                onChange={(ev) => { setCourseName(ev.target.value) }}

                required
              />

              <input
                id="id-course-password"
                type="password"
                placeholder="Password"
                value={coursePassword()}
                class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-75 focus:bg-opacity-100"
                onChange={(ev) => { setCoursePassword(ev.target.value) }}

                required
              />

              <input
                id="id-course-password2"
                type="password"
                placeholder="Confirm password"
                value={coursePassword2()}
                class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-75 focus:bg-opacity-100"
                onChange={(ev) => { setCoursePassword2(ev.target.value) }}

                required
              />

              <div class="grid grid-flow-row grid-cols-2 gap-4 items-center justify-between">
                <Button
                  variant="outlined"
                  color="pmsScheme"
                  onClick={() => {
                    setWarning(null)

                    createCourse(
                      courseName(),
                      coursePassword(),
                      coursePassword2()
                    )
                  }}
                >
                  Confirm
                </Button>

                <Button
                  variant="outlined"
                  color="pmsScheme"
                  onClick={() => { setShowModal(false) }}
                >
                  Exit
                </Button>
              </div>
            </div>


            <Show when={warning() != null}>
              <p class="text-red-300 flex flex-row items-center justify-center text-lg italic mt-8">
                {warning()}
              </p>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  )
}