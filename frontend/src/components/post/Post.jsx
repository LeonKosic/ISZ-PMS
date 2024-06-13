import { Button } from "@suid/material";
import { For, Match, Suspense, Switch, createResource, createSignal } from "solid-js";
import api from "../../api/api";
import { userDetails } from "../../api/stores";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";
import PostComments from "./PostComments";
import { Show } from "solid-js"
import Loading from "../placeholders/Loading"
import preprocessor from "../../api/preprocessor"

import ProjectList from "../generic/ProjectList"
import { useLocation } from "@solidjs/router";

const comment = async (text, postID) => {
  const response = await api.post('/post/comment',
    {
      post: postID,
      body: text
    }
  );

  return response.data;
}

const getAuthor = async (owner) => {
  let authorDetails = await preprocessor.profile.details(owner);
  return {
    loading: false,
    ...authorDetails
  };
}

const getOwnProjects = async () => {
  const response = await api.get('/projects/my')
  return response.data
}

const submitSolution = async (requestID, projectID) => {
  const response = await api.post(
    `/request/solution`,
    {
      project_id: projectID,
      request_id: requestID
    }
  )

  return response.statusText
}

const getSolutions = async (id) => {
  const response = await api.get(
    `/request/${id}/solutions`
  )

  return response.data
}

export default function Post(props) {
  const postID = useLocation().pathname.split('/')[2]

  const [author] = createResource(() => getAuthor(props.data.owner_id))
  const [ownProjects] = createResource(() => getOwnProjects())
  const [solutions] = createResource(() => getSolutions(postID))

  const [commentBoxVisible, setCommentBoxVisible] = createSignal(false);
  const [solutionDialog, setSolutionDialog] = createSignal(null)
  const [commentValue, setCommentValue] = createSignal('');


  return (
    <Suspense>
      <Show
        when={author.loading == false}
        fallback={Loading}
      >
        <div class="items-center justify-center p-2 my-2 mt-20 border-2 border-accent-600 rounded-lg w-2/5 mx-auto text-accent-100">
          {/* Title */}
          <p class="text-4xl py-2 pl-1">{props.data.title}</p>
          <hr class="border-2 border-accent-800 rounded-lg my-1" />

          {/* Body */}
          <p class="text-lg pl-1 text-accent-200">{props.body}</p>

          {/* Author */}
          <div>
            <p class="italic text-gray-500">by {author().name} ({author().username})</p>
          </div>

          <div class="flex flex-row justify-between items-stretch gap-2 py-2">
            {/* Ratings */}
            <UpvoteButton id={props.data.id} />
            <DownvoteButton id={props.data.id} />

            {/* Comment */}
            <Button
              variant="outlined"
              color="pmsScheme"
              onClick={() => { setCommentBoxVisible(!commentBoxVisible()) }}
            >
              Comment
            </Button>

            {/* Submit solution dialog */}
            <Show when={props.data.isFeatureRequest == true}>
              <Button
                variant="outlined"
                color="pmsScheme"
                onClick={() => { setSolutionDialog(true) }}
              >
                Submit solution
              </Button>
            </Show>
          </div>

          <Show when={commentBoxVisible()}>
            <div class="my-6 flex flex-row items-start">
              <input
                class="w-full ml-2 mr-2 pl-2 rounded-lg border-accent-800 border-2 bg-opacity-10 bg-primary-300 h-9"
                placeholder="Your comment..."
                color="pmsScheme"
                id="commentBox"
                onChange={(ev) => { setCommentValue(ev.target.value) }}
              />

              <Button
                color="pmsScheme"
                variant="outlined"
                onClick={() => {
                  comment(commentValue(), props.data.id);
                  setTimeout(() => { location.reload() }, 500)
                }}
              >
                Submit
              </Button>
            </div>
          </Show>

          <Show when={solutionDialog() != null}>
            <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
              <div class="bg-primary-400 pl-14 pr-14 pb-4 rounded-3xl shadow-md w-full max-w-lg">
                <div class="flex flex-col items-center justify-center mt-14 mb-2">
                  <p class="text-2xl">
                    Submit a solution for {props.data.title}
                  </p>

                  <Show
                    when={ownProjects.loading == false && ownProjects().length > 0}
                  >
                    <hr class="border-2 border-accent-600 rounded-lg my-2 w-full" />
                    <ProjectList
                      projects={ownProjects()}
                      style={"flex flex-col items-center justify-center w-full w-max"}
                      cardStyle={"w-full border-2 border-accent-600 rounded-lg p-2 text-lg hover:bg-accent-600 hover:cursor-pointer duration-300 transition-all mt-2"}
                      cardClickAction={(id) => {
                        submitSolution(props.data.id, id);
                        setSolutionDialog(null);
                        setTimeout(() => { location.reload() }, 500)
                      }}
                    />
                    <hr class="border-2 border-accent-600 rounded-lg my-2 w-full" />
                  </Show>

                  <Show
                    when={ownProjects.loading == false && ownProjects().length == 0}
                  >
                    <hr class="border-2 border-accent-600 rounded-lg my-1 w-full" />
                    <div class="flex flex-row items-center justify-center">
                      <p class="text-lg italic">
                        You have no acceptable projects. Why not create some?
                      </p>
                    </div>
                    <hr class="border-2 border-accent-600 rounded-lg my-2 w-full" />
                  </Show>

                  <div class="flex flex-row items-center justify-center my-4">
                    <Button
                      color="pmsScheme"
                      variant="outlined"
                      onClick={() => { setSolutionDialog(null) }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Show>

          {/* Solutions */}
          <Show
            when={solutions.loading == false && props.data.isFeatureRequest == true}
            fallback={<p class="text-xl italic">Loading solutions, please wait...</p>}
          >
            <hr class="border-2 border-accent-600 my-2" />
            <Show
              when={solutions().length > 0}
              fallback={
                <div>
                  <p class="text-xl italic">
                    No solutions submitted yet. Be first!
                  </p>
                </div>
              }
            >
              <div class="flex flex-col items-center justify-center">
                <ProjectList
                  projects={solutions()}
                  style={"flex flex-col items-center justify-center w-full w-max"}
                  cardStyle={"w-full border-2 border-accent-600 rounded-lg p-2 text-lg hover:bg-accent-600 hover:cursor-pointer duration-300 transition-all mt-2"}
                  cardClickAction={(id) => {
                    window.location.href = `/project/${id}`
                    setTimeout(() => { location.reload() }, 1000)
                  }}
                />
              </div>
            </Show>
            <hr class="border-2 border-accent-600 my-2" />
          </Show>

          {/* Comments */}
          <PostComments data={props.data.comments} />

          <div class="children">
            {props.children}
          </div>
        </div>
      </Show >
    </Suspense >
  )
}