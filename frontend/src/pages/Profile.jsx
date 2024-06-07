import api from "../api/api";
import { Show, Suspense, createResource } from "solid-js";
import Loading from "../components/placeholders/Loading";
import UserList from "../components/generic/user/UserList";
import ProjectList from "../components/generic/project/ProjectList";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useLocation } from "@solidjs/router";
import { userDetails } from "../api/stores";
import { projects, user } from "../assets/profile";

export default function Profile(props) {
  const currentUserID = useLocation().pathname.split('/')[2]
  
  // const [user] = createResource(async () => {
  //   const response = await api.get(`/users/${currentUserID}`);
  //   return response.data;
  // });
  
  // const [projects] = createResource(async () => {
  //   const response = await api.get(currentUserID == userDetails.id ? '/projects/my' : `/users/${currentUserID}`);
  //   return response.data;
  // })
  
  console.log(projects())
  console.log(user())
  
  return (
    // <Show when={user.loading == false}>
    <Show when={user().loading == false}>
      <div class="w-1/3 mx-auto mt-8 grid grid-flow-row grid-cols-1 ">
        <Suspense fallback={<Loading />}>  
          <div class="bg-accent-600 bg-opacity-10">
            <ProfileHeader
              username={user()?.username}
              name={user()?.name}
              role={user()?.role}
              bio={user()?.bio}
            />
          </div>    
          
          <div class="pt-4 grid grid-flow-col gap-4 w-full h-80">
            <div class="border-2 rounded-lg border-accent-600 p-2 max-h-80 overflow-y-scroll w-full bg-accent-600 bg-opacity-10">
              <p class="flex flex-auto items-center justify-center text-2xl">Followers {`(${user().followers.length})`}</p>
              <hr class="border-2 border-accent-600 my-2 mb-3 rounded-lg"/>
              <UserList
                cardClickAction={(id) => { window.location.href = `/profiles/${id}`}} 
                users={user().followers}
                cardStyle={"rounded-md border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all hover:cursor-pointer"}
              />
            </div>
            
            <div class="border-2 rounded-lg border-accent-600 p-2 max-h-80 overflow-y-scroll w-full bg-accent-600 bg-opacity-10">
              <p class="flex flex-auto items-center justify-center text-2xl">Following {`(${user().following.length})`}</p>
              <hr class="border-2 border-accent-600 my-2 mb-3 rounded-lg"/>
              <UserList
                cardClickAction={(id) => { window.location.href = `/profiles/${id}`}}
                users={user().following}
                cardStyle={"rounded-md border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all hover:cursor-pointer"}
              />
            </div>
          </div>
          
          <div class="my-2 py-2 mt-3 pt-1 rounded-md border-2 border-accent-600 bg-accent-600 bg-opacity-10">
            <p class="flex flex-col items-center justify-center text-2xl">
              {/* Projects {`(${projects().length})`}   */}
              Projects {`(${projects().data.length})`}
            </p>
            <hr class="border-2 border-accent-600 my-2 mb-3 ml-3 mr-3 rounded-lg" />
            <ProjectList
              projects={projects().data}
              cardClickAction={(id) => { window.location.href = `/projects/${id}` }}
              cardStyle={"hover:cursor-pointer rounded-lg border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all"}
            />
          </div>
        </Suspense>
      </div>
    </Show>
  )
}
