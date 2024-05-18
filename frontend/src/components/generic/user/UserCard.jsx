export default function UserCard(props) {
  return (
    <div
      class={props.style + " "}
      onclick={() => { props.clickAction(props.userid) }}
    >
      <p>
        {props.name}
      </p>
    </div>
  ) 
}