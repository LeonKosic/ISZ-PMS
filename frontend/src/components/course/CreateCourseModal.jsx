import { Button, Dialog, DialogTitle, DialogContent, TextField, Stack } from "@suid/material";
import { createSignal } from "solid-js";

const createCourse = async (name, password) => {
  const url = `${import.meta.env.VITE_API_HOST}/course/create`;
  const response = await fetch(url,
    {
      method: "POST", // ili PUT? (nije zavrseno na bekendu jos)
      body: {
        name: name,
        password: password,
        deleted: false
      }
    })
  
  return response.status;
}

export default function CreateCourseModal(props) {
  const [open, setOpen] = createSignal(false);
  
  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }
  
  return (
    <div class="create-course-modal">
      <Button
        variant="outlined"
        color="pmsScheme"
        onClick={handleClickOpen}  
      >
        Create course
      </Button>
      
      <Dialog
        open={open()}
        onClose={handleClose}
        class="text-primary-100"
        maxWidth="lg"
      >
        <DialogTitle>Create a course</DialogTitle>
        
        <DialogContent>
          <TextField type="text" label="Name" autoFocus fullWidth class="mt-1" margin="normal" />
          <TextField type="text" label="Password" autoFocus fullWidth class="mt-1" margin="normal" />
        </DialogContent>
        
        <Stack
          direction="row"
          spacing={2}
          class="flex flex-auto flex-row justify-center items-center mb-4"
        >
          <Button
            variant="outlined"
            color="monochrome"
            onClick={() => {
              const status = createCourse("replaceme", "replaceme");
              setResult(status == 200 ? "Course not created." : "Course created!"); // TODO
            }}
            >
            Submit
          </Button>
          
          <Button
            variant="outlined"
            color="monochrome"
            onclick={handleClose}
            >
            Close
          </Button>
        </Stack>
      </Dialog>
    </div>
  )
}