import { redirect } from "@solidjs/router";

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
        
        <input
          class="w-3/4 bg-accent-800 px-4 rounded-md
            text-accent-200 text-2xl
            hover:w-5/6 duration-300
            hover:md:w-4/5 
            placeholder:italic
            focus:border-y-0"
          type="text"
          placeholder="Search ...">
        </input>
        
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
