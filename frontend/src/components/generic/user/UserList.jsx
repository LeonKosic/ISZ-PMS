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
              name={user.name}
              username={user.username}
              role={user.role}
              userid={user.id}
              clickAction={props.cardClickAction}
              
              showRole={true}
              
              cardStyle={props.cardStyle}
              highlightCard={props.highlightCard}
              highlightColor={props.highlightColor}
              useMaxWidth={props.cardUseMaxWidth}
            />
        }
      </For>
    </Container>
 ) 
}