import { redirect } from "@solidjs/router";
import {createSignal} from "solid-js"

export default function Searchbar(props){
    let [query, setQuery] = createSignal()
  
    const handleSubmit = (event) => {
      redirect('/search/'+query())
    }
    
    return(
      <form onSubmit={handleSubmit}>
          <input
          class="w-3/4 bg-accent-800 px-4 rounded-md
            text-accent-200 text-2xl
            hover:w-5/6 duration-300
            hover:md:w-4/5 
            placeholder:italic
            focus:border-y-0"
          type="text"
          value={query()?query():null}
          onInput={(e) => e.target.value.slice(-1)=='/n'?handleSubmit():setQuery(e.target.value)}
          placeholder="Search ...">
        </input>
      </form>
    )
}