import { redirect } from "@solidjs/router";
import { Stack } from "@suid/material";

export default function Navbar(props) {
  return (
    <div class="sticky top-0 bg-primary-800 pb-0 z-50">
      <Stack direction="row" spacing={1}>
        <p class="" onClick={redirect('/landing')}>PMS</p>
        <SearchBar />
        <NavbarIcons/>
      </Stack>
      
      <hr class="w-full border-accent-600 border-2"></hr>
    </div>
  );
}
