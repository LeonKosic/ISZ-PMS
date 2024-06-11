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
              id={project.id}
              title={project.title}
              body={project.body}

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