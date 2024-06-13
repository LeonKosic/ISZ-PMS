import { For, mergeProps } from "solid-js";
import UserCard from "./UserCard";
import { Container } from "@suid/material";

export default function UserList(props) {
  const merged = mergeProps({
    cardClickAction: () => { }
  }, props)
  
  return (
    <div class={props?.style}>
      <For each={props.users}>
        {
          (user) =>
            <UserCard
              name={user.name}
              username={user.username}
              role={user.role}
              userid={user.userid}
              
              clickAction={merged.cardClickAction}
              
              showRole={props.showRole}
              showUsername={props.showUsername}
              cardStyle={props.cardStyle}
              highlightCard={props.highlightCard}
              highlightColor={props.highlightColor}
              useMaxWidth={props.cardUseMaxWidth}
            />
        }
      </For>
    </div>
 ) 
}