import UserList from "../generic/user/UserList";

export default function CourseTeachers(props) {
  return (
    <div class="w-1/2 m-4 flex flex-col items-center justify-center border-2 border-accent-600 rounded-lg p-4">
      <p class="text-xl mt-2">Teachers</p>
      <hr class="border-2 border-accent-600 my-2 w-full" />

      <UserList
        users={props.data}

        // style="flex flex-row items-center justify-center max-h-80 overflow-y-scroll gap-2"
        style="max-h-80 overflow-y-scroll"
        cardStyle="w-full border-2 border-accent-600 p-2 hover:bg-accent-600 duration-300 transition-all rounded-xl hover:cursor-pointer my-2"

        cardClickAction={(id) => {
          window.location.href = `/profiles/${id}`;
          setTimeout(() => { location.reload() }, 1000)
        }}

        showUsername={true}
      />
    </div>
  )
}