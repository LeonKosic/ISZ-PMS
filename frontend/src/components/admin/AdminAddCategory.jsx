import { Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";

const addCategory = async (name) => {
  // TODO
  const url = `${import.meta.env.VITE_API_HOST}/api/categories`;
  const response = await fetch(url, { method: "POST", body: JSON.stringify(name) });
  return await response.json();
}

export default function AdminAddCategory(props) {
  const [categoryName, setCategoryName] = createSignal('');

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  }
  
  return (
    <div class="add-ctg-ctr">
      <h1 class="ctr-title">Add a category</h1>
      <hr class="my-2 py-2" />
      
      <Stack direction="row">
        <input
          type="text"
          class="default-form form-big mr-2"
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