import { mergeProps } from "solid-js"

export default function ProfileRepositoryBanner(props) {
  const defaultProps = {
    title: '<no-name>',
    date: '1st January, 2000'
  }
  props = mergeProps(defaultProps, props)
  
  return (
    <div class="repository-banner inset-padding">
      <div class="repository-name">
        {props.title}
      </div>
      
      <div class="repository-date">
        {props.date}
      </div>
    </div>
  )
}