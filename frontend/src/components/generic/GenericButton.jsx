import { Button } from "@suid/material";
import { createSignal } from "solid-js";

export default function GenericButton(props) {
  
  return (
    <>
      <Button
        variant={() => props.variant == undefined ? "outlined" : props.variant}
        color="pmsScheme"
        onClick={props.clickAction}
        class={props?.style}
      >
        {props.text}
      </Button>
      
      {props.children}
    </>
  )
}