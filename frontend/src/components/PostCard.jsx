import { createSignal } from "solid-js"
import { redirect } from "@solidjs/router"
import api from "../api/api"

export default function PostCard(props) {
  const [post, setPost] = createSignal(props.data)

  const callback = async (id, status) => {
    await api.post(`/post/like`, { id, status: post().liked == status ? 0 : status })
    setPost({
      ...post(),
      likes: post().liked == status ? post().likes - status :
        post().liked == -status ? post().likes + 2 * status : post().likes + status,
      liked: post().liked == status ? 0 : status
    })
  }

  return (
    <div class="w-full p-6 bg-primary-300 border border-accent-600 rounded-lg shadow">
      <a href={"/posts/" + post().id}>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-200">{post().title}</h5>
      </a>
      <p class="text-sm text-gray-600">
        by <a href={"/profiles/" + post().author.id}>{post().author.username}</a>
      </p>
      <p class="mb-2 font-normal text-gray-400">{post().body}</p>
      <div class="grid grid-cols-9 grid-rows-1 gap-3">
        <btn onClick={() => callback(post().id, 1)}
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 rounded-lg hover:bg-accent-500 cursor-pointer"
          classList={{ "bg-accent-500": post().liked == 1, "bg-primary-500": post().liked != 1 }}
        >
          like
        </btn>
        <p class="text-gray-400 text-center">{post().likes}</p>
        <btn onClick={() => callback(post().id, -1)}
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 rounded-lg hover:bg-accent-500 cursor-pointer"
          classList={{ "bg-accent-500": post().liked == -1, "bg-primary-500": post().liked != -1 }}
        >
          dislike
        </btn>
        <btn
          class="col-span-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 bg-primary-500 rounded-lg hover:bg-accent-500 cursor-pointer"
          onClick={() => redirect('/posts/' + post().id)}
        >
          Comments
        </btn>
        <btn
          class="col-span-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 bg-primary-500 rounded-lg hover:bg-accent-500 cursor-pointer"
        >
          Share
        </btn>
      </div>
    </div>
  )
}