import { Button, TextField } from "@suid/material";
import { Suspense, createSignal } from "solid-js";
import api from "../../api/api";
import { userDetails } from "../../api/stores";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";
import PostComments from "./PostComments";

const comment = async (text, postID) => {
  const response = await api.post('/post/comments',
    {
      user: userDetails.id,
      post: postID,
      body: text
    }
  );

  return response.data;
}

export default function Post(props) {
  const [commentBoxVisible, setCommentBoxVisible] = createSignal(false);
  const [commentValue, setCommentValue] = createSignal('');

  return (
    <Suspense>
      <div class="p-2 my-2 mt-10 border-2 border-accent-600 rounded-lg max-w-screen-2xl mx-auto text-accent-100 bg-accent-700 bg-opacity-5">
        {/* Title */}
        <p class="text-4xl py-2 pl-1">{props.name}</p>
        <hr class="border-2 border-accent-800 rounded-lg my-1" />

        {/* Body */}
        <p class="text-lg pl-1 text-accent-200">{props.body}</p>

        <div class="flex flex-auto items-center justify-center">
          <p class="italic text-accent-600">{props.posterUsername}</p>
        </div>

        <div class="children">
          {props.children}
        </div>

        <div class="flex flex-row justify-between items-stretch gap-2 py-2">
          {/* Ratings */}
          <UpvoteButton id={props.id} />
          <DownvoteButton id={props.id} />

          {/* Comment */}
          <div
            class="rounded-lg border-2 border-accent-800 flex flex-auto items-center justify-center hover:cursor-pointer hover:bg-accent-800 duration-300 transition-all"
            onClick={() => { setCommentBoxVisible(!commentBoxVisible()) }}
          >
            <p>COMMENT</p>
          </div>
        </div>

        <Show when={commentBoxVisible()}>
          <div class="my-6 flex flex-row items-start">
            <input
              class="w-full ml-2 mr-2 rounded-lg border-accent-800 border-2 bg-opacity-10 bg-primary-300 h-9 pl-2 pr-2"
              placeholder="Your comment..."
              color="pmsScheme"
              id="commentBox"
              onChange={(ev) => { setCommentValue(ev.target.value) }}
            />

            <Button
              color="pmsScheme"
              variant="outlined"
              onClick={() => { comment(commentValue(), props.id) }}
            >
              Submit
            </Button>
          </div>
        </Show>

        {/* Comments */}
        <PostComments data={props.comments} />
      </div>
    </Suspense>
  )
}