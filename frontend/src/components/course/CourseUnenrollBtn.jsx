import { useLocation } from "@solidjs/router";
import { Dialog, DialogContent, DialogTitle, Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";
import api from "../../api/api"

const unenrollCourse = async (id) => {
  const response = await api.delete(`/courses/unenroll/${id}`)
  return response.data;
}

export default function CourseUnenrollBtn(props) {
  // courseName se prosljedjuje iz parent elementa (Course.jsx stranice)
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
    window.location.href = `/courses`
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