import { For } from "solid-js";
import UserCard from "./UserCard";
import { Container } from "@suid/material";

export default function UserList(props) {
  return (
    <Container class={props?.style}>
      <For each={props.users}>
        {
          (user) =>
            <UserCard
              style={props.cardStyle}
              name={user.name}
              username={user.username}
              userid={user.id}
              clickAction={props.cardClickAction}
            />
        }
      </For>
    </Container>
 ) 
}