import { Stack } from "@suid/material";
import { mergeProps } from "solid-js"

export default function FileCard(props) {
  const merged = mergeProps({
    onClick: () => { },
    name: "",
    icon: "fa-solid fa-file"
  }, props)

  let iconType;
  if (props.isDirectory)
    iconType = "fa-solid fa-folder"
  else
    iconType = "fa-solid fa-file"
  return (
    <div>
      <div onClick={merged.onClick} class="flex flex-row justify-start gap-2 items-center flex-nowrap overflow-clip text-xl hover:bg-accent-900 duration-300 py-1 pl-2">
        <i class={`${iconType} text-accent-400`} />
        <p>{merged.name}</p>
      </div>
      <hr class="w-full my-1 border-accent-600 " />
    </div>
  )
}