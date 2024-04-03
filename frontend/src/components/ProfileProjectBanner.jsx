import { redirect } from "@solidjs/router"
import { mergeProps } from "solid-js"

import '../app.css'

const redirectRepository = (url) => {
  redirect(url);
}

export default function ProjectBanner(props) {
  const defaultProps = {
    title: "<no-name>",
    description: "<no-description>",
    owner: "<no-owner>",
    maintainers: []
  }
  
  props = mergeProps(defaultProps, props)
  
  const maintainersSplit =
    props.maintainers.length == 0 ? 'None' : props.maintainers.map(
      (maintainer, idx) => (
        <span key={idx}>{maintainer}{idx < props.maintainers.length - 1 ? ', ' : ''}</span>
      )
    )
  
  return (
    <div class="project-entry" onClick={redirectRepository}>
      <div class="project-name">{props.title}</div>
      <div class="project-description">{props.description}</div>
      
      {/* <A href="/user/some_person_id">Some Person</A> */}
      <div class="project-owner">Owner: {props.owner}</div> 
      <div class="project-maintainers">Maintainers: {maintainersSplit}</div>
    </div>
  )
}