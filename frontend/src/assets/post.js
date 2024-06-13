// demo request response za neki post
export const postDetails = () => {
  return {
    id: 1,
    name: "Post Title (npr. Project Management System, Feature Request: FR1)",
    body: "Post Text (npr. Projektni zadatak iz PS, Treba mi taj i taj feature)",
    owner_id: 1,
    posterUsername: "oggnjen",

    // ne trebam dobiti izbrisane postove
    // deleted: false,

    type: "featureRequestResponse",
    comments: [
      {
        id: 1,
        user: "oggnjen",
        post: 1,
        body: "Odgovor - link ka projektu, komentar na projekat, itd."
      },
      {
        id: 1,
        user: "oggnjen",
        post: 1,
        body: "Odgovor - link ka projektu, komentar na projekat, itd."
      },
      {
        id: 1,
        user: "oggnjen",
        post: 1,
        body: "Odgovor - link ka projektu, komentar na projekat, itd."
      },
    ],
  }
}