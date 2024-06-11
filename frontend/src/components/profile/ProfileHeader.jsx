import { mergeProps } from "solid-js"

export default function ProfileHeader(props) {
  const defaultProps = {
    username: '<no-username>',
    name: '<no-name>',
    role: '<no-role>',
    bio: '<no-bio>',
  }
  
  props = mergeProps(defaultProps, props)
  
  if (props.bio.length > 100)
    props.bio = props.bio.substring(0, 100) + '...'
  
  return (
    <div class="border-2 rounded-lg border-accent-600 p-4 w-full mx-auto">
      <div>
        <div class="text-3xl pb-2 flex flex-auto items-center justify-center">
          {props.username} | {props.name}
        </div>
        
        <div class="text-lg flex flex-auto items-center justify-center">
          {props.role} | {props.bio}
        </div>
      </div>
    </div>
  )
}