import ProfileActivityCard from "~/components/ProfileActivityCard";
import ProfileHeader from "~/components/ProfileHeader";
import ProfileProjectBanner from "~/components/ProfileProjectBanner";
import ProfileRepositoryBanner from "~/components/ProfileRepositoryBanner";

import api from "~/api/api";
import { Show, Suspense, createResource } from "solid-js";
import { A } from "@solidjs/router";

export default function Profile(props) {
  const [user] = createResource(async () => {
    const url = `http://localhost:3301/ogg`;
    // const url = `${VITE_API_HOST}${useLocation().pathname}`;
    // const response = await api.get(url);
    
    const response = await fetch(url);
    return await response.json();
  });
  
  console.log(user()?.bio);
  
  return (
    <Suspense>  
      <div class="user-profile">
        <div class="activities">
          <For each={user()?.activity}>
            {
              (activity) => 
                <ProfileActivityCard
                  atTime={activity.date}
                  action={activity.what}
                  where={activity.where}
                />
            }
          </For>
        </div>
        
        <div class="info">
        <ProfileHeader
          username={user()?.username}
          name={user()?.fullname}
          role={user()?.role}
          bio={user()?.bio}
          avatarUrl={user()?.avatarUrl}
        />
          
          <div class="social">
            <div class="following">
              <h1 class="italic">Followers</h1>
              <For each={user()?.following}>
                {
                  (follower, idx) => {
                    if (idx() >= 5) return (<></>)
                    else return (
                      <p>{follower}</p>
                    )
                  }
                }
              </For>
            </div>
            <div class="popular-projects">
              <h1 class="italic">Popular projects</h1>
              <For each={user()?.popularProjects}>
                {
                  (project, idx) => {
                    if (idx() >= 5) return (<></>)
                    else return (
                      <A href="TODO#REPLACEME">
                        {project}
                        <br/>
                      </A>    
                    )
                  }
                }
              </For>
            </div>
          </div>
          
          <div class="project-listings">
            <h1 class="text-big italic">Spotlight</h1>
            <For each={user()?.spotlight}>
              {
                (project, idx) =>
                  <ProfileProjectBanner
                    title={project.title}
                    description={project.description}
                    owner={project.owner}
                    maintainers={project.maintainers}
                  />
              }
            </For>
          </div>
        </div>
        
        <div class="repositories">
          <For each={user()?.repositories}>
            {
              (repo, idx) => 
                <ProfileRepositoryBanner
                  title={repo.title}
                  date={repo.date}
                />
            }
          </For>
        </div>
      </div>
    </Suspense>
  )
}