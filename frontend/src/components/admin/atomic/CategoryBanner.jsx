import { mergeProps } from "solid-js";

export default function CategoryBanner(props) {
  const merged = mergeProps({
    id: "<no-id>",
    name: "<no-name>"
  }, props);

  return (
    <div
      class="italic w-auto h-3 inline my-2 mr-2 p-2 border-2 border-accent-600 rounded-lg text-lg
        bg-opacity-0 cursor-pointer hover:bg-opacity-50 hover:bg-red-300 transition-all duration-500
      "
    >
      <div class="flex flex-row items-center justify-center text-lg">
        {merged.name} | {merged.role}
      </div>
      <div class="flex flex-row items-center justify-center text-md">
        {merged.email}
      </div>
    </div>
  )
}