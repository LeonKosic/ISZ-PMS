import { mergeProps } from "solid-js"

export default function ProfileActivityCard(props) {
  const defaultProps = {
    atTime: "<at-time>",
    action: "<did-something>",
    where: "<here>"
  }
  
  props = mergeProps(defaultProps, props)
  
  return (
    <div class="recent-activity inset-padding">
      <div className="activity-entry">
        ({props.atTime}) {props.action} {props.where}
      </div>
    </div>
  )
}