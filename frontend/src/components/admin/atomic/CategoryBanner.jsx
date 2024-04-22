export default function CategoryBanner(props) {
  const merged = mergeProps({
      id: "<no-id>",
      name: "<no-name>"
  }, props);
  
  return (
    <div class="italic w-auto h-auto border-l-accent-200 rounded-lg border-opacity-50">
      "{merged.name}"
    </div>
  )
}