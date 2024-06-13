import CourseCard from "./CourseCard"

export default function CourseList(props) {
  return (
    <div class="w-1/2 mx-auto py-16 grid grid-flow-row grid-cols-3 space-y-4 gap-4 justify-between items-center;">
      <For each={props?.courses}>
        {
          (course) =>
            <a href={`/courses/${course.id}`}>
              <CourseCard
                name={course.name}
                about={"Opis kursa..."}
                cardStyle={props.cardStyle}
              />
            </a>
        }
      </For>
    </div>
  )
}