import { Button } from "@suid/material"
import { createSignal, mergeProps, Show } from "solid-js"

export default function CourseCard(props) {
  const merged = mergeProps({
    showEnroll: false,
    id: 0,
  }, props)

  const [showModal, setShowModal] = createSignal(false)
  const [coursePassword, setCoursePassword] = createSignal('')
  const [warning, setWarning] = createSignal(null)

  return (
    <div class={props.cardStyle} onClick={props.cardClickAction}>
      <p
        class="text-big mb-2 mt-1 pb-2"
        style={{ 'overflow-wrap': 'break-word' }}
      >
        {props.name}
      </p >

      <hr class="separator" />

      <p class="italic pb-1 overflow pt-1"
        style={{ 'overflow-wrap': 'break-word' }}
      >
        {props.about}
      </p>

      <Show when={merged.showEnroll == true}>
        <div class="flex flex-row items-center justify-center">
          <Button
            class="w-32 h-10"
            variant="outlined"
            color="pmsScheme"
            onClick={() => { setShowModal(true) }}
          >
            Enroll
          </Button>
        </div>

        <Show when={showModal() == true}>
          <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
            <div class="bg-primary-400 pl-14 pr-14 pb-14 rounded-3xl shadow-md w-full max-w-lg">
              <div class="flex flex-row items-center justify-center pt-8">
                <p class="text-3xl text-bold pb-8">
                  Create a course
                </p>
              </div>
              <div class="grid grid-flow-row grid-cols-1 gap-6 z-0">
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

                <div class="grid grid-flow-row grid-cols-2 gap-4 items-center justify-between">
                  <Button
                    variant="outlined"
                    color="pmsScheme"
                    onClick={() => {
                      setWarning(null)
                      enroll(coursePassword())
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
      </Show>
    </div>
  )
}