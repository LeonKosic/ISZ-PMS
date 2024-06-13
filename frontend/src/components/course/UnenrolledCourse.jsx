import { Button, Input, Dialog, DialogContent, DialogTitle, Stack } from "@suid/material"
import { Show, createSignal } from "solid-js";
import api from "../../api/api";

export default function UnenrolledCourse(props) {
  const [showModal, setShowModal] = createSignal(false)
  const [coursePassword, setCoursePassword] = createSignal('')
  const [warning, setWarning] = createSignal(null);

  const enroll = async (id, password) => {
    try {
      const response = await api.post(
        `/course/enroll`,
        {
          id: id,
          password: password
        }
      )

      if (response.status === 200)
        location.reload();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setWarning("Wrong password, please try again.")
      }
    }
  }

  return (
    <div class="max-w-screen-2xl mx-auto my-12">
      <div class="flex flex-col items-center justify-center p-8 border-2 border-accent-600 rounded-xl">
        <p class="text-4xl pb-2">{props.data.name}</p>
        <p class="text-lg italic pb-2">You are <span class="bold">not enrolled</span> in this course.</p>
        <hr class="w-full mx-auto opacity-75 pb-3" />

        <div class="flex flex-row items-center justify-between">
          <Button
            color="pmsScheme"
            variant="outlined"
            class="w-28 h-12"
            onClick={() => { setWarning(null); setShowModal(true) }}
          >
            Enroll
          </Button>
        </div>
      </div>

      <Show when={showModal() == true}>
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
          <div class="bg-primary-400 pl-14 pr-14 pb-14 rounded-3xl shadow-md w-full max-w-lg">
            <div class="flex flex-row items-center justify-center pt-8">
              <p class="text-3xl text-bold pb-8">
                Enroll into course
              </p>
            </div>
            <div class="grid grid-flow-row grid-cols-1 gap-6">
              <input
                id="id-course-password"
                type="password"
                placeholder="Password"
                value={coursePassword()}
                class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
                onChange={(ev) => { setCoursePassword(ev.target.value) }}

                required
              />


              <div class="grid grid-flow-row grid-cols-2 gap-4 items-center justify-between">
                <Button
                  variant="outlined"
                  color="pmsScheme"
                  onClick={() => {
                    setWarning(null);
                    enroll(props.data.id, coursePassword())
                  }}
                >
                  Enroll
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
                Oops! {warning()}
              </p>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  )
}