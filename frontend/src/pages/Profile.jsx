import ProfileActivityCard from "../components/profile/ProfileActivityCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileProjectBanner from "../components/profile/ProfileProjectBanner";
import ProfileRepositoryBanner from "../components/profile/ProfileRepositoryBanner";

import api from "../api/api";
import { Suspense, createResource } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import Loading from "../components/placeholders/Loading";
import UserList from "../components/generic/user/UserList";

export default function Profile(props) {
  /*
  const [user] = createResource(async () => {
    const id = useLocation().pathname.split('/')[2];
    const response = await api.get(`/users/${id}`);
    return response.data;
  });
  
  const [projects] = createResource(async () => {
    const response = await api.get('/projects/my');
    return response.data;
  }
  */
 
  const projects = () => ([
    {
      id: 1,
      title: "project1"
    },
    {
      id: 2,
      title: "project2"
    },
    {
      id: 3,
      title: "project3"
    }
  ])
  
  const user = () => ({
    username: "oggnjen",
    name: "Ognjen Komadina",
    role: "Student",
    bio: "Something about me, Software Engineering student @ University of Banja Luka",
    following: [
      {
        username: "test1",
        name: "nikola nikolic"
      },
      {
        username: "test2",
        name: "marko markovic"
      }
    ],
    followers: [
      {
        username: "test1",
        name: "nikola nikolic"
      },
      {
        username: "test2",
        name: "marko markovic"
      },
      {
        username: "test1",
        name: "nikola nikolic"
      },
      {
        username: "test2",
        name: "marko markovic"
      },
      {
        username: "test1",
        name: "nikola nikolic"
      },
      {
        username: "test2",
        name: "marko markovic"
      },
      {
        username: "test1",
        name: "nikola nikolic"
      },
      {
        username: "test2",
        name: "marko markovic"
      },
      {
        username: "test1",
        name: "nikola nikolic"
      },
      {
        username: "test2",
        name: "marko markovic"
      }
    ],
    projects: projects()
  })
  
  return (
    <div class="w-1/3 mx-auto mt-8 grid grid-flow-row grid-cols-1">
      <Suspense fallback={<Loading />}>  
        <div class="profile-header">
          <ProfileHeader
            username={user()?.username}
            name={user()?.name}
            role={user()?.role}
            bio={user()?.bio}
          />
        </div>    
        
        <div class="pt-4 grid grid-flow-col gap-4 w-full h-80">
          <div class="border-2 rounded-lg border-accent-600 p-2 max-h-80 overflow-y-scroll w-full">
            <p class="flex flex-auto items-center justify-center text-2xl">Followers {`(${user().followers.length})`}</p>
            <hr class="border-2 border-accent-600 my-2 mb-3"/>
            <UserList
              // ne moze redirect u ovom slucaju ako ne dobijam id follower-a
              // cardClickAction={(id) => { window.location.replace = `/profiles/${id}` }}
              users={user().followers}
              cardStyle={"rounded-md border-2 border-accent-600 my-1 ms-2 mr-2"}
            />
          </div>
          
          <div class="border-2 rounded-lg border-accent-600 p-2 max-h-80 overflow-y-scroll w-full">
            <p class="flex flex-auto items-center justify-center text-2xl">Following {`(${user().following.length})`}</p>
            <hr class="border-2 border-accent-600 my-2 mb-3"/>
            <UserList
              users={user().following}
              cardStyle={"rounded-md border-2 border-accent-600 my-1 ms-2 mr-2"}
            />
          </div>
        </div>
        
        <div class="flex flex-row items-center justify-center my-2 py-2 rounded-md border-2 border-accent-600">
          <p class="text-2xl">
            Projects {`(${projects().length})`}  
          </p>
        </div>
      </Suspense>
    </div>
  )
}
