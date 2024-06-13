import { For, createSignal, createResource } from "solid-js"
import { useLocation, useParams } from "@solidjs/router";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import api from "../api/api";
import UserList from "../components/generic/user/UserList";
import CourseList from "../components/generic/course/CourseList";
import ProjectList from "../components/generic/project/ProjectList";
import RequestList from "../components/generic/request/RequestList";

async function getUsers(username) { 
    const response = await api.post("/users/search", { username: username })
    return response.data; 
   }

async function getProjects(projectName) { 
    const response = await api.post("/projects/search", { title: projectName })
    return response.data; 
   }

async function getCourses(courseName) { 
    const response = await api.post("/course/search", { name: courseName })
    return response.data; 
   }

async function getRequests(requestName) { 
    const response = await api.post("/request/search", { title: requestName })
    return response.data; 
   }

export default function Search(){
    const query = useParams().query;

    let [select, setSelect] = createSignal(0)

    const [users] = createResource(() => getUsers(query))
    const [courses] = createResource(() => getCourses(query))
    const [projects] = createResource(() => getProjects(query))
    const [requests] = createResource(() => getRequests(query))

    console.log(users())

    return(
        <div>
        <RightSidebar />
        <LeftSidebar />
        <div class="mx-96">
            <div class="grid grid-cols-4 grid-rows-1">
                <button class="col-span-1 text-center" 
                classList={{"bg-accent-500 border-b-2 border-accent-400": select() == 0}}
                onClick={() => setSelect(0)}>
                Users
                </button>
                <button class="col-span-1 text-center"
                 classList={{"bg-accent-500 border-b-2 border-accent-400": select() == 1}}
                 onClick={() => setSelect(1)}>
                Courses
                </button>
                <button class="col-span-1 text-center"
                 classList={{"bg-accent-500 border-b-2 border-accent-400": select() == 2}}
                 onClick={() => setSelect(2)}>
                Projects
                </button>
                <button class="col-span-1 text-center"
                 classList={{"bg-accent-500 border-b-2 border-accent-400": select() == 3}}
                 onClick={() => setSelect(3)}>
                Project requests
                </button>
            </div>
            <div>
                <Show when={select() == 0}>
                    <UserList users={users()} 
                    cardClickAction={(id) => { window.location.href = `/profiles/${id}` }}
                    cardStyle={"overflow-auto max-h-52 my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"}
                />
                </Show>
                <Show when={select() == 1}>
                    <CourseList courses={courses()}
                    //cardClickAction={(id) => { window.location.href = `/courses/${id}` }}
                    cardStyle={"overflow-auto max-h-52 my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"}   
                    />
                </Show>
                <Show when={select() == 2}>
                    <ProjectList projects={projects()}
                    cardClickAction={(id) => { window.location.href = `/post/${id}` }}
                    cardStyle={"overflow-auto max-h-52 my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"}   
                    />
                </Show>
                <Show when={select() == 3}>
                    <RequestList requests={requests()}
                    cardClickAction={(id) => { window.location.href = `/post/${id}` }}
                    cardStyle={"overflow-auto max-h-52 my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"}   
                    />
                </Show>
            </div>
        </div>
        </div>
    )
}