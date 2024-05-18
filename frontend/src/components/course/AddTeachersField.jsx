import { Button, Input, Stack } from "@suid/material"
import api from "../../api/api"
import { searchUser } from "../../api/searchUser"
import { createSignal } from "solid-js"
import UserList from "../generic/user/UserList"

export default function AddTeachersField(props) {
  const getInput = () => document.querySelector("#teacherName").value

  const addTeacher = async (payload) => {
    const response = await api.post('/courses/teacher/add', {
      teacher_id: payload.teacherID,
      course_id: payload.courseID
    })
    
    return await response.data
  }
  
  const [searchResultVisible, setSearchResultVisible] = createSignal(false)
  const [searchResult, setSearchResult] = createSignal([])
  
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setSearchResult(searchUser(event.target.value, false).users)
      setSearchResultVisible(true)
    }
  }
  
  return (
    <div>
      <center class="text-medium"><p>Add teachers</p></center>
      
      <Stack direction="column">
        <Input
          class="w-full"
          id="teacherName"
          type="text"
          placeholder="Press Enter to search..."
          onKeyDown={handleSearch}
        />
        
        <Show when={searchResultVisible()}>
          {/* TODO: provjeriti radi li ovo uopste */}
          <UserList
            style={"max-h-52 overflow-auto hover:cursor-pointer"}
            users={searchResult()}
            cardStyle={"underline-offset-2 hover:text-xl pl-2 duration-150 hover:cursor-pointer hover:bg-slate-300 rounded-sm"}
            cardClickAction={(teacherID) => addTeacher(teacherID, props.courseID)}
          />
        </Show>
      </Stack>
    </div>   
  )
}