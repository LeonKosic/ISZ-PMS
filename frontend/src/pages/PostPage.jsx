import Post from "../components/post/Post";
import { postDetails } from '../assets/post'

export default function PostPage(props) {
  const demo = postDetails()

  return (
    <Post
      id={demo.id}
      name={demo.name}
      body={demo.body}
      comments={demo.comments}
    />
  )
}