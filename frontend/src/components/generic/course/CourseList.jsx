import CourseCard from "./CourseCard"

export default function CourseList(props) {
  return (
    <div class="courses-list-ctr">
      <For each={props?.courses()}>
        {
          (course) => {
            if (course.deleted == false)
              return (
                <a href={`/courses/${course.id}`}>
                  <CourseCard
                    name={course.name}
                    about={"Opis kursa..."}
                  />
                </a>
              )
          }
        }
      </For>
    </div>
  )
}