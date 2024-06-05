import api from "../api/api";
import { Suspense, createResource } from "solid-js";
import Loading from "../components/placeholders/Loading";
import UserList from "../components/generic/user/UserList";
import ProjectList from "../components/generic/project/ProjectList";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useLocation } from "@solidjs/router";

export default function Profile(props) {
  const [user] = createResource(async () => {
    const id = useLocation().pathname.split('/')[2];
    console.log(id);
    const response = await api.get(`/users/${id}`);
    return response.data;
  });
  
  const [projects] = createResource(async () => {
    const response = await api.get('/projects/my');
    return response.data;
  })
  
  return (
    <Show when={user.loading == false}>
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
                // ne moze redirect u ovom slucaju ako ne dobijam id follower-a
                // cardClickAction={(id) => { window.location.replace = `/profiles/${id}` }}
                users={user().followers}
                cardStyle={"rounded-md border-2 border-accent-600 my-1 ms-2 mr-2"}
              />
            </div>
            
            <div class="border-2 rounded-lg border-accent-600 p-2 max-h-80 overflow-y-scroll w-full bg-accent-600 bg-opacity-10">
              <p class="flex flex-auto items-center justify-center text-2xl">Following {`(${user().following.length})`}</p>
              <hr class="border-2 border-accent-600 my-2 mb-3 rounded-lg"/>
              <UserList
                users={user().following}
                cardStyle={"rounded-md border-2 border-accent-600 my-1 ms-2 mr-2"}
              />
            </div>
          </div>
          
          <div class="my-2 py-2 mt-3 pt-1 rounded-md border-2 border-accent-600 bg-accent-600 bg-opacity-10">
            <p class="flex flex-col items-center justify-center text-2xl">
              Projects {`(${projects().length})`}  
            </p>
            <hr class="border-2 border-accent-600 my-2 mb-3 ml-3 mr-3 rounded-lg" />
            <ProjectList
              projects={projects()}
              cardClickAction={(id) => { window.location.replace(`/projects/${id}`)}}
              cardStyle={"hover:cursor-pointer rounded-lg border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all"}
            />
          </div>
        </Suspense>
      </div>
    </Show>
  )
}
