import { Button } from "@suid/material";

export default function AdminAddCategory(props) {
  return (
    <div class="add-ctg-ctr">
      <h1 class="ctr-title">Add a category</h1>
      <hr class="my-2 py-2" />
      
      <input
        type="text"
        class="default-form form-big mr-4"
        placeholder="Name"
      />
      
      <Button
        variant="outlined"
        color="pmsScheme"
        class="m-4"
      >
        Add
      </Button>
    </div>
  )
}