import UserList from "../generic/user/UserList";

export default function ProjectOwner(props) {
  return (
    <div class="w-full">
      <p
        class="text-2xl flex flex-row justify-center items-center pb-2 pt-2"
      >
        Owner
      </p>

      <div class="border-0 rounded-xl border-accent-600 py-2 h-min w-full">
        <UserList
          style={"w-8"}
          users={[props.owner]}
          showRole={false}
          highlightCard={true}
          highlightColor={"bg-accent-600"}
          cardUseMaxWidth={false}

          cardStyle={
            "hover:bg-accent-600 bg-opacity-25 w-50 rounded-xl cursor-pointer duration-500 border-2 border-accent-600 transition-all"
          }

          cardClickAction={(id) => { window.location.href = `/profiles/${id}` }}
        />
      </div>
    </div>
  )
}