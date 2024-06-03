import CourseCard from "./CourseCard"

export default function CourseList(props) {
  return (
    <div class="courses-list-ctr">
      <For each={props?.courses()}>
        {
          (courseDetails) => 
            <a href={`/courses/${courseDetails.id}`}>
              <CourseCard
                name={courseDetails.name}
                about={courseDetails.about}
              />
            </a>
        }
      </For>
    </div>
  )
}