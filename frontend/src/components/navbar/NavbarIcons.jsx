import { Menu, MenuItem } from "@suid/material";
import Icon from "./Icon";
import { redirect } from "@solidjs/router";
import { createSignal } from "solid-js";
import { userDetails } from "../../api/stores";
import SearchBar from "./SearchBar";

export default function NavbarIcons(props) {
  const [anchorEl, setAnchorEl] = createSignal(null);
  const open = () => Boolean(anchorEl())
  
  return (
    <div class="h-auto py-2 px-4 border-2 border-accent-600 rounded-full w-auto">
      <div class="flex flex-row justify-center items-center gap-4">        
        <Icon
          iconID="fa-solid fa-book"
          clickAction={() => { redirect('/courses') }}
          iconClass={"p-1 opacity-75 hover:cursor-pointer hover:opacity-100 transition-all duration-500 text-3xl"}
          />
        
        <Icon
          iconID="fa-solid fa-folder-open"
          clickAction={() => { redirect('/projects') }}
          iconClass={"p-1 opacity-75 hover:cursor-pointer hover:opacity-100 transition-all duration-500 text-3xl"}
          />
        
        <div 
          onClick={(event) => { setAnchorEl(event.currentTarget) }}
        >
          <Icon
            iconID="fa-solid fa-user"
            iconClass={"p-1 opacity-75 hover:cursor-pointer hover:opacity-100 transition-all duration-500 text-3xl"}
          />
          
          <Menu
            id="navbar-dropdown"
            open={open()}
            anchorEl={anchorEl()}
            onClose={() => { setAnchorEl(null) }}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem><a href={`/profiles/${userDetails.id}`}>View profile</a></MenuItem>
            <MenuItem><a href="/users/edit">Edit profile</a></MenuItem> 
            
            {/* TODO: logout (strahinjino) */}
            <MenuItem onClick={() => {console.log('logout')}}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}