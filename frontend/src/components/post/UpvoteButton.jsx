import { Button } from "@suid/material"
import api from "../../api/api";

const upvote = async (postID, isUpvoted) => {
  const response = await api.post('/post/like', { id: postID, status: !isUpvoted })
  return response.data;
}

export default function UpvoteButton(props) {
  // refresuje stranicu i upvoteuje opet ali bmkndms
  let upvoted = false;

  return (
    <div
      class="hover:cursor-pointer hover:bg-accent-600 bg-opacity-10 duration-500 transition-all"
      onClick={() => { if (!upvoted) { upvote(props.id, upvoted); upvoted = true } }}
    >
      <Button
        color="pmsScheme"
        variant="outlined"
      >
        Upvote
      </Button>
    </div>
  )
}