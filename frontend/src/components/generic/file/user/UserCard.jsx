import { mergeProps } from "solid-js"

export default function UserCard(props) {  
  return (
    <div class={props.cardStyle}>
      <div
        class="flex flex-row justify-center items-center"
        style={{ 'overflow-wrap': 'break-word', 'word-wrap': 'break-word' }}
        onClick={() => props.clickAction(props.userid)}
      >
        <p class="p-1">
          {props.name}
          <span class="italic text-md">{props.showRole ? ` | ${props.role}` : ""}</span>
        </p>
      </div>
    </div>
  )
}