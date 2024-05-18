import { mergeProps } from "solid-js";

export default function Loading(props) {
  const merged = mergeProps({
    message: "Loading..."
  }, props);
  
  return (
    <div class="loading-placeholder">
      {merged.message}
    </div>
  )
}