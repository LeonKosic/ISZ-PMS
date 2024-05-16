import {For} from "solid-js"
import {createStore} from "solid-js/store"

export default function Landing(props) {

  const [posts, setPosts] = createStore([
    { title: 'J---aiyznGQ', body: 'Andrew Tate had been wanting this for so long. Just one night where he wasnt absolutely covered head in toe in women who want to fuck him./nBut he was here in this prison. Balding. A guard named Demetri watching everything he was doing. So he closed his eyes and started to fantasize about where he wanted to be. He was alone. ', likes:3 , liked: false, disliked: false, author:'Say Gex'},
    { title: 'z_AbfPXTKms', body: 'Maru', likes:5, liked: false, disliked:false, author:'Joe Mama'},
    { title: 'OUtn3pvWmpg', body: 'Henri The Existential Cat', likes:8, liked: false, disliked:false, author:'Moment de la Bruh'}
  ]);

  function like(postTitle, isLiked, isDisliked){
    if(!isLiked && !isDisliked){
      console.log(1)
      setPosts((p) => p.title === postTitle, "likes", (likes) => likes+1)
      //dodati funkciju koja ce da updateuje lajkove u bazi
    }
    else if(!isLiked && isDisliked){
      console.log(2)
      setPosts((p) => p.title === postTitle, "likes", (likes) => likes+2)
      setPosts((p) => p.title === postTitle, "disliked", false)
      //dodati funkciju koja ce da updateuje lajkove u bazi
    }
    else{
      console.log(3)
      setPosts((p) => p.title === postTitle, "likes", (likes) => likes-1)
      //dodati funkciju koja ce da updateuje lajkove u bazi
    }
    setPosts((p) => p.title === postTitle, "liked", (liked) => !liked)
  }

  function dislike(postTitle, isLiked, isDisliked){
    if(!isDisliked && !isLiked){
      setPosts((p) => p.title === postTitle, "likes", (likes) => likes-1)
      //dodati funkciju koja ce da updateuje lajkove u bazi
    }
    else if(!isDisliked && isLiked){
      setPosts((p) => p.title === postTitle, "likes", (likes) => likes-2)
      setPosts((p) => p.title === postTitle, "liked", false)
      //dodati funkciju koja ce da updateuje lajkove u bazi
    }
    else{
      setPosts((p) => p.title === postTitle, "likes", (likes) => likes+1)
      //dodati funkciju koja ce da updateuje lajkove u bazi
    }
    setPosts((p) => p.title === postTitle, "disliked", (disliked) => !disliked)
  }

  return (
    <div class="grid w-screen h-screen gap-0  grid-cols-6 mx-auto">
      <div class="bg-primary-900 h-full col-span-1">
        
      </div>
      <div class="bg-primary-900  h-full border-x-2 border-gray-900 col-span-4">
        <div class="grid grid-cols-1 gap-3">
          <For each={posts}>{(post, i) =>(
            <div class="w-full p-6 bg-primary-300 border border-accent-600 rounded-lg shadow">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-200">{post.title}</h5>
                </a>
                <p class="text-sm text-gray-600">by {post.author}</p>
                <p class="mb-2 font-normal text-gray-400">{post.body}</p>
                <div class="grid grid-cols-9 grid-rows-1 gap-3">
                  <btn onClick={() => like(post.title, post.liked, post.disliked)}
                   class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 rounded-lg hover:bg-accent-500 cursor-pointer"
                   classList={{"bg-accent-500": post.liked, "bg-primary-500": !post.liked}}
                  >
                    like
                  </btn>
                  <p class="text-gray-400 text-center">{post.likes}</p>
                  <btn onClick={() => dislike(post.title, post.liked, post.disliked)}
                   class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 rounded-lg hover:bg-accent-500 cursor-pointer"
                   classList={{"bg-accent-500": post.disliked, "bg-primary-500": !post.disliked}}
                  >
                    dislike
                  </btn>
                  <btn
                    class="col-span-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 bg-primary-500 rounded-lg hover:bg-accent-500 cursor-pointer"
                  >
                    Comments
                  </btn>
                  <btn
                    class="col-span-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 bg-primary-500 rounded-lg hover:bg-accent-500 cursor-pointer"
                  >
                    Share
                  </btn>
                </div>
            </div>
          )}</For>
        </div>
      </div>
      <div class="bg-primary-900  h-full col-span-1"> 
      
      </div>
    </div>
  )
}