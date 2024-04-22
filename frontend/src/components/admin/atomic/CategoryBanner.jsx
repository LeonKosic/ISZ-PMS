export default function CategoryBanner(props) {
  const merged = mergeProps({
      id: "<no-id>",
      name: "<no-name>"
  }, props);
  
  return (
    <div class="italic">
      "{merged.name}"
    </div>
  )
}