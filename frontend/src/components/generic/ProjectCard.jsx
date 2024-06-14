import { Show, mergeProps } from "solid-js"

export default function ProjectCard(props) {
  const merged = mergeProps({
    clickAction: () => { },
  }, props)

  return (
    <div
      class={`flex justify-center items-center mx-auto ${props.cardStyle}`}
      onClick={() => { merged.clickAction(props.projectid) }}
    >
      <div class="flex flex-col justify-center items-center text-center overflow-hidden">
        <p class="p-2 break-words text-2xl">
          {props.title}
        </p>

        <hr class="border-2 border-accent-600 rounded-lg w-full" />

        <p class="p-2 italic break-words text-lg">
          {props.body}
        </p>
      </div>
    </div>
  )
}
