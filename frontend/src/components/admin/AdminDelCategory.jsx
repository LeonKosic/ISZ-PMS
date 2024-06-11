import api from "../../api/api"
import CategoryBanner from "./atomic/CategoryBanner";
import { For, createResource, createSignal } from "solid-js";


const fetchCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

const delCategory = async (id) => {
  const response = await api.delete(`/admin/category/${id}`)
  return response
}

export default function AdminDelCategory(props) {
  // const [categories] = createResource(fetchCategories);
  const categories = () => [
    { id: "1", name: "category" },
    { id: "1", name: "politics-and-science" },
    { id: "1", name: "cat1" },
    { id: "1", name: "cat1" },
    { id: "1", name: "cat1" },
    { id: "1", name: "cat1" },
  ]

  const [cats, setCats] = createSignal(categories())
  const [warning, setWarning] = createSignal('')

  return (
    <div class="border-2 my-10 w-full subpixel-antialiased ms-8 p-4 rounded-xl h-auto">
      <h1 class="text-2xl">Delete a category</h1>
      <hr class="my-2 py-2" />

      <Show
        when={true}
        fallback={<p class="italic">Loading categories...</p>}
      >
        <Show
          when={warning() != ''}
        >
          <p class="text-red-400">{warning()}</p>
        </Show>

        <For each={categories()}>
          {
            (category, idx) =>
              <CategoryBanner
                onClick={() => {
                  const res = delCategory(category.id);
                  if (res.status == 200) setCats(cats().filter(val => val.id === category.id))
                  else { setWarning(res.statusText); }
                }}
                name={category.name}
                id={category.id} />
          }
        </For>
      </Show>
    </div>
  )
}