import { Show, mergeProps } from "solid-js"

export default function ProjectCard(props) {
  const merged = mergeProps({
    clickAction: () => { },
  }, props)

  return (
    <div
      class={props.cardStyle}
      onClick={() => { merged.clickAction(props.id) }}
    >
      <div class="flex flex-row justify-center items-center"
        style={{ 'overflow-wrap': 'break-word', 'word-wrap': 'break-word' }}>
        <p class="text-xl p-1">
          {props.title}
        </p>

        <p class="text-lg p-1">
          {props.body}
        </p>
      </div>
    </div>
  )
}