import api from "../api/api";
import PostList from "../components/PostList"
import {createResource} from "solid-js"

export default function Landing(props) {

  //const posts = createResource(async () => {
  //  const response = await api.get("/posts");
  //  return await response.json();
  //});

  //console.log(posts)

const posts = [{
    title: 'title',
    body: 'texts',
    likes: 31,
    liked: 0,
    id: 1,
    author: {
      id: 1,
      username: "marko1234",
      names: "marko"
    }
  },
  {   title: 'title2',
      body: 'texts',
      likes: 15,
      liked: 1,
      id: 2,
      author: {
        id: 2,
        username: "marko123",
        names: "marko"
      }}, ]

  return (
      <PostList data={posts}/>
  )
}
