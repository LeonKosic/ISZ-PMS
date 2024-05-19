import UserList from "../generic/file/user/UserList";

export default function ProjectOwner(props) {
  return (
    <div>
      <p
        class="text-2xl flex flex-row justify-center items-center pb-2 pt-2"
      >
        Owner
      </p>
      
      <div class="border-2 rounded-xl border-accent-600 p-4 h-min">
        <UserList
          style={"w-8"}
          users={[props.owner]}
          showRole={false}
          highlightCard={true}
          highlightColor={"bg-accent-600"}
          cardUseMaxWidth={false}
          
          cardStyle={
            "hover:bg-accent-600 bg-opacity-25 w-50 rounded-xl cursor-pointer duration-500 border-2 border-accent-600  pr-4 transition-all my-2"
          }
          
          cardClickAction={(id) => {
            window.location.href = (`/profiles/${id}`)
          }}
          />
      </div>
    </div>
  )
}