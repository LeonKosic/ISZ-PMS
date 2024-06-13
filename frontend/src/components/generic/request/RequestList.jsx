import { For, mergeProps } from "solid-js";
import RequestCard from "./RequestCard";

export default function RequestList(props) {
  const merged = mergeProps({
    cardClickAction: () => { }
  }, props)

  return (
    <div class={props?.style}>
      <For each={props.requests}>
        {
          (request) =>
            <RequestCard
              id={request.id}
              title={request.title}
              body={request.body}

              clickAction={merged.cardClickAction}

              cardStyle={props.cardStyle}
              highlightCard={props.highlightCard}
              highlightColor={props.highlightColor}
            />
        }
      </For>
    </div>
  )
}