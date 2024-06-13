import { redirect } from "@solidjs/router";
import Searchbar from "./SearchBar";

export default function Navbar(props) {
  return (
    <div class="sticky top-0 bg-primary-800 pb-0 z-50">
      
    <div class="pl-3 pt-3 pr-3 h-full">
      <div class="flex flex-grow justify-evenly">  
        <div class="header-ctr cursor-pointer px-12 mx-0" onclick={redirect('/')}>
          <h1 class="flex place-items-center text-5xl">
            PMS
          </h1>
        </div>

        <Searchbar/>
        
        <div class="minibar-wrapper grid grid-flow-row grid-cols-3 gap-2">
          <div class="bg-accent-800 rounded-full size-12" />
          <div class="bg-accent-800 rounded-full size-12" />
          <div class="bg-accent-800 rounded-full size-12"/>
        </div>
      </div>
      <hr class="mt-4 pb-0 w-full text-accent"/>
      </div>
      
    </div>
  );
}
