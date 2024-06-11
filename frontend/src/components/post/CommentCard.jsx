import { Show, createResource } from "solid-js";
import preprocessor from "../../api/preprocessor";
import Loading from "../placeholders/Loading";

const getAuthor = async (owner) => {
  let authorDetails = await preprocessor.profile.details(owner);
  return {
    loading: false,
    ...authorDetails
  };
}

export default function CommentCard(props) {
  const [author] = createResource(() => getAuthor(props.data.user))

  return (
    <Show when={author.loading == false} fallback={Loading}>
      <div class="w-full rounded-xl my-2 py-3 border-2 border-accent-600 bg-primary-500 bg-opacity-50">
        {/* Poster */}
        <p class="text-xl pl-2 pb-2">{author().username}, {author().name}</p>
        <hr class="border-2 border-accent-800 rounded-lg" />

        {/* Content */}
        <p class="text-lg pl-2">{props.data.body}</p>
      </div>
    </Show>
  )
}