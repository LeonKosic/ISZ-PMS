import { mergeProps } from "solid-js"
import CourseCard from "./CourseCard"

export default function CourseList(props) {
  const merged = mergeProps({
    cardShowEnroll: false,
    cardClickAction: (id) => { window.location.href = `/courses/${id}` }
  }, props)

  return (
    <div class="w-1/2 mx-auto py-16 grid grid-flow-row grid-cols-3 gap-4 justify-between items-center">
      <For each={props?.courses}>
        {
          (course) =>
            <CourseCard
              name={course.name}
              about={"Opis kursa..."}
              cardClickAction={() => { merged.cardClickAction(course.id) }}
              cardStyle={props.cardStyle}
              showEnroll={merged.cardShowEnroll}
            />
        }
      </For>
    </div>
  )
}