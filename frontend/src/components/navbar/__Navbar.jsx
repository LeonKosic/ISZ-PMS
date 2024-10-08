import { redirect } from "@solidjs/router";
import Searchbar from "./SearchBar";

export default function Navbar(props) {
  const userId = localStorage.getItem("user_id");

  const navigateToRequests = () => {
    window.location.href = "/requests";
  };

  const navigateToProfile = () => {
    if (userId) {
      window.location.href = `/profiles/${userId}`;
    } else {
      console.error("User ID not found in local storage.");
    }
  };

  const navigateToProjects = () => {
    window.location.href = "/projects";
  };

  return (
    <div class="sticky top-0 bg-primary-800 pb-0 z-50">
      <div class="pl-3 pt-3 pr-3 h-full">
        <div class="flex flex-grow justify-evenly items-center">  
          <div class="header-ctr cursor-pointer px-12 mx-0" onclick={redirect('/')}>
            <h1 class="flex place-items-center text-5xl">
              PMS
            </h1>
          </div>
          
          <Searchbar/>
          
          <div class="minibar-wrapper grid grid-flow-row grid-cols-3 gap-2 ml-4">
            <div
              class="bg-accent-800 rounded-full flex items-center justify-center cursor-pointer"
              onClick={navigateToProfile}
            >
              <span class="text-white text-center">Profile</span>
            </div>
            <div
              class="bg-accent-800 rounded-full flex items-center justify-center cursor-pointer"
              onClick={navigateToRequests}
            >
              <span class="text-white text-center">Project Requests</span>
            </div>
            <div
              class="bg-accent-800 rounded-full flex items-center justify-center cursor-pointer"
              onClick={navigateToProjects}
            >
              <span class="text-white text-center">My Projects</span>
            </div>
          </div>
        </div>
        <hr class="mt-4 pb-0 w-full text-accent" />
      </div>
    </div>
  );
}