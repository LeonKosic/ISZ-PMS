import { For, createSignal } from "solid-js";
import Icon from "./Icon";
import { Menu, MenuItem } from "@suid/material";
import api from "../../api/api";

const searchUsers = async (name) => {
  const response = await api.post(`/users/search`, { username: name })
  return response.data
}

const searchProjects = async (name) => {
  // nema pretraga projekata
  // const response = await api.post('/search/projects', { projectname: name })
  // return response.data
}

const searchCourses = async (id) => {
  const response = await api.get(`/course/${id}`)
  return response.data
}

export default function SearchBar(props) {
  const [anchorEl, setAnchorEl] = createSignal(null);
  const open = () => Boolean(anchorEl())

  let searchResults = []

  const process = (responseArr) => {
    let processed = []

    responseArr.forEach(entry => {
      let newEntry = []

      if (entry.username != undefined) {
        newEntry.url = `/profiles/${entry.id}`
        newEntry.name = entry.username
        newEntry.type = "Profiles"
      }
      else if (entry.project_id != undefined) {
        newEntry.url = `/projects/${entry.project_id}`
        newEntry.name = entry.project_name
        newEntry.type = "Projects"
      }
      else if (entry.course_id != undefined) {
        newEntry.url = `/courses/${entry.course_id}`
        newEntry.name = entry.course_name
        newEntry.type = "Courses"
      }
      processed.push(newEntry)
    });

    processed.sort((a) => a.type)

    return processed
  }

  searchResults = process(searchResults)

  const handleSearch = (ev) => {
    const text = document.querySelector("#searchbar").value

    searchResults = []
    searchResults.push(searchUsers(text))
    // TODO: nije jos implementirano
    // searchResults.push(searchProjects(text))
    searchResults.push(searchCourses(text))

    searchResults = process(searchResults)

    if (searchResults.length == 0)
      setAnchorEl(null)
  }

  return (
    <div class="relative w-full ml-10 mr-10 ">
      <input
        id="searchbar"
        type="text"
        class="h-12 w-full rounded-full bg-primary-600 border-2 border-opacity-25 border-accent-600 pl-4"
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            setAnchorEl(ev.currentTarget)
            handleSearch()
          }
        }}
      />

      <div onClick={(evt) => { setAnchorEl(evt.currentTarget) }}>
        <Icon
          iconID="fa-solid fa-search"
          clickAction={() => { handleSearch() }}
          iconClass={"cursor-pointer text-xl text-accent-300 top-0 right-0 absolute mr-3 pt-2 pl-2 pr-2"}
        />

        <Menu
          id="search-dropdown"
          open={open()}
          anchorEl={anchorEl()}
          onClose={() => { setAnchorEl(null) }}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <For each={searchResults}>
            {
              (entry) => {
                return (
                  <MenuItem class="h-8">
                    {
                      /* TODO: kad se navigira na rutu koristi se trenutna (relativno) - ne moze se sa jedne putanje otici na istu - pukne,
                      a redirect() i navigate() ne rade uopste */
                    }
                    <a href={`http://localhost:3000${entry.url}`}>
                      {entry.name}
                      {console.log(entry.url)}
                      <span class="text-sm italic"> in {entry.type}</span>
                    </a>
                  </MenuItem>
                )
              }
            }
          </For>
        </Menu>
      </div>
    </div>
  )
}