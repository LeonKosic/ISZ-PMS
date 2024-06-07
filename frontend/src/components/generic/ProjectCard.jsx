import { Show, mergeProps } from "solid-js"

export default function ProjectCard(props) {
  const merged = mergeProps({
    clickAction: () => { },
  }, props)

  return (
    <div
      class={props.cardStyle}
      onClick={() => { merged.clickAction(props.projectid) }}
    >
      <div class="flex flex-row justify-center items-center"
        style={{ 'overflow-wrap': 'break-word', 'word-wrap': 'break-word' }}>
        <p class="p-1">
          {props.title}
        </p>
      </div>
    </div>
  )
}