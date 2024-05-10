import { useLocation } from "@solidjs/router";
import { Dialog, DialogContent, DialogTitle, Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";

const unenrollCourse = async (id, username) => {
  // TODO: delete/post? endpoint?
  const url = `${import.meta.env.VITE_API_HOST}/courses/unenroll`;
  const response = await fetch(url, {
    method: "POST",
    body: {
      course_id: id,
      user_name: username
    }
  })
  
  return await response.json();
}

export default function CourseUnenrollBtn(props) {
  const courseName = props.courseName ? props.courseName : "undefined"
  const courseId = useLocation().pathname.split('/')[2];
  
  // TODO: fetch username from JWT
  const [open, setOpen] = createSignal(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  
  const handleUnenroll = () => {
    unenrollCourse(courseId)
  }
  
  return (
    <div class="course-unenroll-ctr">
      <Button
        variant="outlined"
        color="pmsScheme"
        onClick={handleClickOpen}
      >
        Unenroll
      </Button>
      
      <Dialog
        open={open()}
        onClose={handleClose}
        class="text-primary-100"
        maxWidth="md"
      >
        <DialogTitle>Are you sure you want to unenroll from {courseName}?</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} class="flex flex-auto justify-center items-center">
            <Button variant="outlined" color="monochrome" onClick={handleUnenroll}>Yes</Button>
            <Button variant="outlined" color="monochrome" onClick={handleClose}>No</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  )
}