import { For, mergeProps } from "solid-js";
import ProjectCard from "./ProjectCard";

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
              title={project.title}
              projectid={project.id}
              
              clickAction={merged.cardClickAction}
              
              cardStyle={props.cardStyle}
              highlightCard={props.highlightCard}
              highlightColor={props.highlightColor}
            />
        }
      </For>
    </div>
 ) 
}