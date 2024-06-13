import api from "../api/api";
import { Show, Suspense, createResource, createSignal } from "solid-js";
import Loading from "../components/placeholders/Loading";
import UserList from "../components/generic/user/UserList";
import ProjectList from "../components/generic/project/ProjectList";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useLocation } from "@solidjs/router";
import { userDetails } from "../api/stores";
import { projects } from "../assets/profile";
import { Button } from "@suid/material";
import preprocessor from "../api/preprocessor";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";

const getProfileInfo = async (id) => {
  let details = await preprocessor.profile.details(id);
  let projects = await preprocessor.profile.projects(id);
  let followers = await preprocessor.profile.followers(id);
  let following = await preprocessor.profile.following(id);

  return {
    loading: false,
    ...details,

    followers: followers,
    following: following,
    projects: projects
  }
}

export default function Profile(props) {
  const currentUserID = useLocation().pathname.split('/')[2]

  const follow = async (target) => {
    const response = await api.post(
      '/users/follow',
      { id: target }
    )

    return response.data;
  }

  const unfollow = async (target) => {
    const response = await api.post(
      '/users/unfollow',
      { id: target }
    )

    return response.data;
  }

  const [user] = createResource(async () => getProfileInfo(currentUserID));

  return (
    <Show when={user.loading == false} fallback={Loading}>
      <RightSidebar />
      <LeftSidebar />
      <div class="w-1/3 mx-auto mt-8 grid grid-flow-row grid-cols-1 ">
        <Suspense fallback={<Loading />}>
          <div class="bg-accent-600 bg-opacity-10">
            <ProfileHeader
              username={user()?.username}
              name={user()?.name}
              role={user()?.email}
              bio={"Some bio"}
            />
          </div>

          <Show when={currentUserID != userDetails.id}>
            <div class="flex flex-row justify-center items-center pt-4">
              {
                (() => {
                  const follows = user().followers.find(x => x.id == userDetails.id)

                  if (follows) {
                    return (
                      <Button
                        color="pmsScheme"
                        variant="outlined"
                        fullWidth
                        onClick={async () => { unfollow(currentUserID) }}
                      >
                        Unfollow
                      </Button>
                    )
                  } else return (<Button
                    color="pmsScheme"
                    variant="outlined"
                    fullWidth
                    onClick={async () => { follow(currentUserID) }}
                  >
                    Follow
                  </Button>)
                })
              }
            </div>
          </Show>

          <div class="pt-4 grid grid-flow-col gap-4 w-full h-80">
            <div class="border-2 rounded-lg border-accent-600 p-2 max-h-80 overflow-y-scroll w-full bg-accent-600 bg-opacity-10">
              <p class="flex flex-auto items-center justify-center text-2xl">Followers {`(${user().followers.length})`}</p>
              <hr class="border-2 border-accent-600 my-2 mb-3 rounded-lg" />
              <UserList
                cardClickAction={(id) => { window.location.href = `/profiles/${id}` }}
                users={user().followers}
                cardStyle={"rounded-md border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all hover:cursor-pointer"}
              />
            </div>

            <div class="border-2 rounded-lg border-accent-600 p-2 max-h-80 overflow-y-scroll w-full bg-accent-600 bg-opacity-10">
              <p class="flex flex-auto items-center justify-center text-2xl">Following {`(${user().following.length})`}</p>
              <hr class="border-2 border-accent-600 my-2 mb-3 rounded-lg" />
              <UserList
                cardClickAction={(id) => { window.location.href = `/profiles/${id}` }}
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
              projects={user().projects}
              cardClickAction={(id) => { window.location.href = `/projects/${id}` }}
              cardStyle={"hover:cursor-pointer rounded-lg border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all"}
            />
          </div>
        </Suspense>
      </div>
    </Show>
  )
}
