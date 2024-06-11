import { Button } from "@suid/material"
import api from "../../api/api";

const downvote = async (postID, isDownvoted) => {
  const response = await api.post('/post/like', { id: postID, status: !isDownvoted })
  return response.data;
}


export default function DownvoteButton(props) {
  // refresuje stranicu i downvoteuje opet ali bmkndms
  let downvoted = false;

  return (
    <div
      class="hover:cursor-pointer hover:bg-accent-600 bg-opacity-10 duration-500 transition-all"
      onClick={() => { if (!downvoted) { downvote(props.id, downvoted); downvoted = true } }}
    >
      <Button
        color="pmsScheme"
        variant="outlined"
      >
        Downvote
      </Button>
    </div>
  )
}