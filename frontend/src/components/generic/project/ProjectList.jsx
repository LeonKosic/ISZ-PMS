import { For, mergeProps } from "solid-js";

export default function ProjectList(props) {
  const merged = mergeProps({
    cardClickAction: () => { }
  }, props)
  
  return (
    <div class={props?.style}>
      <For each={props.projects}>
        {
          (project) =>
            <ProjectCard
              title={project.name}
              projectname={project.projectname}
              role={project.role}
              projectid={project.id}
              
              clickAction={merged.cardClickAction}
              
              cardStyle={props.cardStyle}
              highlightCard={props.highlightCard}
              highlightColor={props.highlightColor}
              useMaxWidth={props.cardUseMaxWidth}
            />
        }
      </For>
    </div>
 ) 
}