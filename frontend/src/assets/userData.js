const projects = () => ([
  {
    id: 1,
    title: "project1"
  },
  {
    id: 2,
    title: "project2"
  },
  {
    id: 3,
    title: "project3"
  }
])

const user = () => ({
  username: "oggnjen",
  name: "Ognjen Komadina",
  role: "Student",
  bio: "Something about me, Software Engineering student @ University of Banja Luka",
  following: [
    {
      username: "test1",
      name: "nikola nikolic"
    },
    {
      username: "test2",
      name: "marko markovic"
    }
  ],
  followers: [
    {
      username: "test1",
      name: "nikola nikolic"
    },
    {
      username: "test2",
      name: "marko markovic"
    },
    {
      username: "test1",
      name: "nikola nikolic"
    },
    {
      username: "test2",
      name: "marko markovic"
    },
    {
      username: "test1",
      name: "nikola nikolic"
    },
    {
      username: "test2",
      name: "marko markovic"
    },
    {
      username: "test1",
      name: "nikola nikolic"
    },
    {
      username: "test2",
      name: "marko markovic"
    },
    {
      username: "test1",
      name: "nikola nikolic"
    },
    {
      username: "test2",
      name: "marko markovic"
    }
  ],
  projects: projects()
})