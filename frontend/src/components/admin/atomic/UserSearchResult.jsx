import { Button } from "@suid/material";
import { mergeProps } from "solid-js";

export default function UserSearchResult(props) {
  const NOT_FOUND = "No such user found."
  const merged = mergeProps({
    username: NOT_FOUND
  }, props);
  
  return (
    <div class="user-search-result">
      <Button variant="outlined" class="hover:bg-red-400 hover:bg-opacity-50 transition:opacity duration-200">
        {merged.username}
      </Button>
    </div>
  )
}