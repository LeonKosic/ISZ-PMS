import UserList from "../generic/user/UserList";

export default function ProjectMaintainers(props) {
  return (
    <div>
      {/* <p class="ps-5 pb-4 mt-16 pt-2 text-2xl">Maintainers</p> */}
      <p
        class="text-2xl flex flex-row justify-center items-center pb-2 mt-8"
      >
        Maintainers
      </p>
      
      <div class="border-2 rounded-xl border-accent-600 p-4 h-min">
        <UserList
          style={"w-8"}
          users={props.maintainers}
          showRole={false}
          highlightCard={true}
          highlightColor={"bg-accent-600"}
          cardUseMaxWidth={false}
          cardStyle={
            "hover:bg-accent-600 bg-opacity-25 w-50 rounded-xl cursor-pointer duration-500 border-2 border-accent-600 ps-4 pr-4 transition-all my-2"
          }
          cardClickAction={(id) => { window.location.href = `/profiles/${id}` }}
          />
      </div>
    </div>
  )
}