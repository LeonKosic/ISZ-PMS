import { mergeProps } from "solid-js"

export default function Icon(props) {
  const merged = mergeProps({
    clickAction: () => { },
    iconClass: "",
    iconID: ""
  }, props)

  return (
    <div
      onClick={() => { merged.clickAction() }}
      class={merged.iconClass}
    >
      <i class={merged.iconID} />
    </div>
  )
}