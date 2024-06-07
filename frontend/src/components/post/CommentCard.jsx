export default function CommentCard(props) {
  return (
    <div class="w-full rounded-xl my-2 py-1 border-2 border-accent-600 bg-primary-500 bg-opacity-50">
      {/* Poster */}
      <p class="text-xl pl-2 pb-2">{props.data.user}</p>
      <hr class="border-2 border-accent-800 rounded-lg" />

      {/* Content */}
      <p class="text-lg pl-2">{props.data.body}</p>
    </div>
  )
}