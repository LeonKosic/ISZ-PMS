import { Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";
import api from "../../api/api";

const addCategory = async (name) => {
  const response = await api.post('/admin/category', { name: name })
  return response.data
}

export default function AdminAddCategory(props) {
  const [categoryName, setCategoryName] = createSignal('');

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  }

  return (
    <div class="border-2 subpixel-antialiased ms-8 p-4 rounded-xl h-auto w-full">
      <h1 class="ctr-title">Add a category</h1>
      <hr class="my-2 py-2" />

      <Stack direction="row">
        <input
          type="text"
          class="subpixel-antialiased rounded-lg bg-opacity-10 bg-primary-100 border-2 p-4 text-xl mr-4 w-full border-accent-600"
          value={categoryName()}
          onChange={handleInputChange}
          placeholder="Name"
        />

        <div onClick={() => addCategory(categoryName())}>
          <Button
            variant="outlined"
            color="pmsScheme"
            class="m-2 h-full"
          >
            Add
          </Button>
        </div>
      </Stack>
    </div>
  )
}