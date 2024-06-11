import { Button, Input, Stack } from "@suid/material"
import api from "../../api/api"
import { searchUser } from "../../api/searchUser"
import { createSignal } from "solid-js"
import UserList from "../generic/user/UserList"

export default function AddTeachersField(props) {
  const getInput = () => document.querySelector("#teacherName").value
  
  const addTeacher = async (payload) => {
    const response = await api.post('/course/teacher', {
      teacher_id: payload.teacherID,
      course_id: payload.courseID
    })
    
    return await response.data
  }
  
  const [searchResultVisible, setSearchResultVisible] = createSignal(false)
  const [searchResult, setSearchResult] = createSignal([])
  
  const handleSearch = () => {
    setSearchResult(searchUser(getInput(), false))
    setSearchResultVisible(true)
  }
  
  return (
    <div>
      <center class="text-medium"><p>Add teachers</p></center>
      
      <Stack direction="column">
        <Stack direction="row" spacing={2}>
          <Input
            class="w-full"
            id="teacherName"
            type="text"
            placeholder="Search teachers..."
          />
          
          <Button
            color="monochrome"
            variant="outlined"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>
        
        <Show when={searchResultVisible()}>
          <UserList
            style={"max-h-52 overflow-auto hover:cursor-pointer"}
            users={searchResult()}
            highlightCard={true}
            highlightColor={"bg-primary-300"}
            cardUseMaxWidth={false}
            cardClickAction={(teacherID) => addTeacher(teacherID, props.courseID)}
          />
        </Show>
      </Stack>
    </div>   
  )
}