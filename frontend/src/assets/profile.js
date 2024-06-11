export const user = () => ({
  loading: false,
  username: "oggnjen",
  name: "Ognjen Komadina",
  role: "Student",
  bio: "jedan obican covjek",
  followers: [
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
  ],
  following: [
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
    { id: 1, username: "oggnjen", name: "Ognjen Komadina" },
  ],
})

export const projects = () => ({
  loading: false,
  data: [
    {
      id: 1,
      title: "ime1"
    },
    {
      id: 2,
      title: "ime2"
    },
    {
      id: 3,
      title: "ime3"
    }
  ]
})