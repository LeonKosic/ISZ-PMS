import { Box, Container, Stack } from "@suid/material";
import { Show, createSignal } from "solid-js";
import Icon from "./Icon";

export default function SearchBar(props) {
  const [visible, setVisible] = createSignal(false)

  let timer;
  const resetTimer = () => {
    clearTimeout(timer)
    timer = setTimeout(() => setVisible(false), 5 * 1000)
  }
  
  const handleSearch = (event) => {
    if (event.key !== 'Enter')
      return
  
    const searchbar = document.querySelector("#searchbar")    
    const text = searchbar.value
  }
  
  return (
    <Stack direction="row">
      <Show when={!visible()}>
        <Icon
          iconID="fa-solid fa-search"
          clickAction={() => { setVisible(!visible()); if (visible()) resetTimer() }}
          iconClass={"cursor-pointer"}
          />
      </Show>
      
      <Show when={visible()}>
        <div class="relative">
          <input
            id="searchbar"
            type="text"
            class="h-10 w-80 pl-4 rounded-full transition-all duration-1000 bg-accent-800 overflow-hidden"
            onKeyDown={(ev) => { resetTimer(); handleSearch(ev) }}
          />
        </div>
      </Show>
    </Stack>
  )
}