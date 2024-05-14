import { Button, ThemeProvider } from "@suid/material";
import theme from "../../styles/suidTheme";
import api from "../../api/api"
import CategoryBanner from "./atomic/CategoryBanner";
import { For, createResource } from "solid-js";


const fetchCategories = async () => {
  // TODO
  const url = `${import.meta.env.VITE_API_HOST}/admin/category`;
  const response = await fetch(url, { method: "GET" });
  return await response.json();
}

const delCategory = async (name) => {
  // TODO
  const url = `${import.meta.env.VITE_API_HOST}/admin/category`;
  const response = await fetch(url, { method: "DELETE", body: { category_name: name } });
  return await response.json();
}

export default function AdminDelCategory(props) {
  const [categories] = createResource(fetchCategories);
  
  return (
    <div class="del-ctg-ctr">
      <h1 class="ctr-title">Delete a category</h1>
      <hr class="my-2 py-2"/>
      
      <Show
        when={true}
        fallback={<p class="italic">Loading categories...</p>}
      > 
        <ThemeProvider theme={theme}>
          <For each={categories()}>
            {
              (category, idx) => 
                <CategoryBanner
                  onClick={() => delCategory(category.name)}
                  name={category.name}
                  id={category.id} />
            }
          </For>
        </ThemeProvider>
      </Show>
    </div>
  )
}