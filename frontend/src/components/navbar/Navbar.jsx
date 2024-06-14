import { redirect } from "@solidjs/router";
import { Stack } from "@suid/material";

import SearchBar from "./SearchBar";
import NavbarIcons from "./NavbarIcons";
import Banner from "./Banner";
import { Show } from "solid-js";

export default function Navbar(props) {
  return (
    <Show when={localStorage.getItem('accessToken') != null}>
      <div class="sticky top-0 bg-primary-800 pb-0 z-50 py-2">
        <div class="flex flex-row justify-between items-center ml-2 mr-6">
          <Banner />
          <SearchBar />
          <NavbarIcons />
        </div>

        <hr class="w-full border-accent-600 border-2 mt-2"></hr>
      </div>
    </Show>
  );
}
