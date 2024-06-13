import { Button } from "@suid/material"
import { createSignal, mergeProps, Show } from "solid-js"

export default function CourseCard(props) {
  const merged = mergeProps({
    showEnroll: false,
    id: 0,
    cardClickAction: () => { }
  }, props)

  return (
    <div class={props.cardStyle} onClick={merged.cardClickAction}>
      <p
        class="text-big mb-2 mt-1 pb-2"
        style={{ 'overflow-wrap': 'break-word' }}
      >
        {props.name}
      </p >

      <hr class="separator" />

      <p class="italic pb-1 overflow pt-1"
        style={{ 'overflow-wrap': 'break-word' }}
      >
        {props.about}
      </p>
    </div>
  )
}