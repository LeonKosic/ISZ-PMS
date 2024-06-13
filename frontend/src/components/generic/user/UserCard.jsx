import { Show, mergeProps } from "solid-js"

export default function UserCard(props) {
  const merged = mergeProps({
    clickAction: () => { },
    showUsername: false
  }, props)

  return (
    <div
      class={props.cardStyle}
      onClick={() => { merged.clickAction(props.userid) }}
    >
      <div class="flex flex-row justify-center items-center"
        style={{'overflow-wrap': 'break-word', 'word-wrap': 'break-word'}}>
        <p class="p-1">
          {props.name}
          <span class="italic text-md">{props.showRole ? ` | ${props.role}` : ""}</span>
        </p>
        
        <Show when={merged.showUsername && props.username != undefined}>
            <p>{`(${props.username})`}</p>
        </Show>
      </div>
    </div>
  )
}