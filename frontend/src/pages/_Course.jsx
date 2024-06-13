import { useLocation } from "@solidjs/router";
import api from "../api/api";
import { createResource, createSignal } from "solid-js";
import CourseCard from "../components/generic/course/CourseCard";
import UserList from "../components/generic/user/UserList";
import PostList from "../components/generic/post/PostList";
import { Button, Container, Dialog, DialogContent, DialogTitle, Input, Stack } from "@suid/material";
import { userDetails } from "../api/stores";
import KickParticipantField from "../components/course/KickParticipantField";
import AddTeachersField from "../components/course/AddTeachersField";
import RemoveTeachersField from "../components/course/RemoveTeachersField";
import CourseUnenrollBtn from "../components/course/CourseUnenrollBtn";
import RightSidebar from "../components/sidebars/right/RightSidebar";
import LeftSidebar from "../components/sidebars/left/LeftSidebar";

const getCourseInformation = async (id) => {
  const response = await api.get(`/course/${id}`);
  return response.data;
};

const isEnrolled = async (id) => {
  const response = await api.get(`/course/${id}`)
  return response.status != 400
}

export default function Course(props) {
  const courseID = useLocation().pathname.split("/")[2];
  let course = { loading: true };

  let result = () => {
    const response = isEnrolled(courseID);
    return response
  }

  if (isEnrolled(courseID))
    [course] = createResource(async () => getCourseInformation(courseID));

  const [editDialogOpen, setEditDialogOpen] = createSignal(false);
  const editDialogHandler = () => {
    setEditDialogOpen(!editDialogOpen());
  };

  const [courseName, setCourseName] = createSignal("");
  const [coursePassword, setCoursePassword] = createSignal("");
  const [coursePasswordConfirm, setCoursePasswordConfirm] = createSignal("");

  const submitCourseChanges = async () => {
    setCourseName(document.querySelector("#nameInput").value);
    setCoursePassword(document.querySelector("#passwordInput").value);
    setCoursePasswordConfirm(document.querySelector("#passwordConfirmInput").value);

    let payload = {
      id: courseID,
    };

    // check if name is modified
    if (courseName() != "") payload["name"] = courseName();

    // check if password is edited
    if (coursePassword() != "") {
      payload["password"] = coursePassword();
      payload["password2"] = coursePasswordConfirm();
    }

    const response = await api.put("/course", payload);

    return response.data;
  };

  return (
    <Show when={course.loading == false}>
      <RightSidebar />
      <LeftSidebar />

      <div class="max-w-screen-xl mx-auto mt-8">
        <div class="flex flex-col items-center justify-center">
          <div class="mt-2 pt-1 pr-8 w-full max-w-2xl">
            <div class="flex flex-col gap-3">
              <div>
                <CourseCard
                  name={course().name}
                  about={course().about}
                  style="border-2 border-accent-700 rounded-lg py-3"
                />
              </div>

              <Stack direction="row" spacing={2} class="justify-around">
                <CourseUnenrollBtn courseName={course().name} />

                <Show when={course().owner_id == userDetails.id || course().isTeacher} class="py-2">
                  <Button color="pmsScheme" variant="outlined" class="h-auto" onClick={editDialogHandler}>
                    Edit course
                  </Button>

                  <Dialog open={editDialogOpen()} class="bg-primary-300 bg-opacity-50">
                    <DialogTitle>{course().name}</DialogTitle>

                    <DialogContent>
                      <Stack direction="column" gap={2}>
                        <Input placeholder={course().name} type="text" id="nameInput" />

                        <Input placeholder="New password..." type="text" id="passwordInput" />

                        <Input placeholder="Confirm password..." type="text" id="passwordConfirmInput" />

                        <AddTeachersField courseID={course().id} />

                        <RemoveTeachersField courseID={course().id} teachers={course().teachers} />

                        <Stack direction="row" spacing={2} class="flex flex-row items-center justify-center">
                          <Button color="monochrome" onClick={submitCourseChanges}>
                            Confirm
                          </Button>

                          <Button color="monochrome" onClick={editDialogHandler}>
                            Close
                          </Button>
                        </Stack>
                      </Stack>
                    </DialogContent>
                  </Dialog>
                </Show>
              </Stack>

              <Show when={isEnrolled(courseID)}>
                <div class="border-2 border-accent-700 pr-2 py-2 my-2 rounded-lg">
                  <p class="text-medium flex flex-row items-center justify-center pb-2"> Teachers </p>
                  <hr class="separator w-2/3 mx-auto opacity-75 pb-3" />
                  <div class="overflow-auto max-h-52">
                    <UserList
                      class=""
                      users={course().teachers}
                      cardStyle="overflow-auto max-h-52 my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"
                    />
                  </div>
                </div>
              </Show>
            </div>
          </div>

          <div class="w-full max-w-screen-xl mt-8">
            <PostList data={course().content} />
          </div>
        </div>
      </div>
    </Show>
  );
}

