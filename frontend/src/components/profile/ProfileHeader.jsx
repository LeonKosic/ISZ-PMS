import { mergeProps } from "solid-js"

export default function ProfileHeader(props) {
  const defaultProps = {
    username: '<no-username>',
    name: '<no-name>',
    role: '<no-role>',
    bio: '<no-bio>',
    avatarUrl: '../../public/avatar.png'
  }
  
  props = mergeProps(defaultProps, props)
  
  if (props.bio.length > 100)
    props.bio = props.bio.substring(0, 100) + '...'
  
  return (
    <div class="header inset-padding">
      {/* Slika/container se mora izobliciti nekako kada tekst u .biography overflowuje */}
      <img class="avatar" src={props.avatarUrl} />
    
      <div class="basic-description">
        <div class="username text-medium">
          {props.username}
        </div>
        
        <div class="full-name text-huge">
          {props.name}
        </div>
        
        <div class="role text-big">
          {props.role}
        </div>
        
        <div class="biography text-medium">
          {props.bio}
        </div>
      </div>
    </div>
  )
}