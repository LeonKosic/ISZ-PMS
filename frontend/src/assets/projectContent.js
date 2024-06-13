export const projectInfo = () => ({
  name: "Project Management System",
  body: "Projektni zadatak iz inzenjeringa softverskih zahtjeva, project management service",
  owner: {
    id: "1",
    username: "oggnjen",
    name: "Ognjen Komadina"
  },
  collaborators: [
    { id: "2", username: "testuser2", name: "fullname2" },
    { id: "3", username: "testuser3", name: "fullname3" },
    { id: "4", username: "testuser4", name: "fullname4" },
    { id: "5", username: "testuser5", name: "fullname5" },
  ],
  commits: [1, 2, 3, 4, 5, 6],
  files: [
    { name: "dir1", data: "", isDirectory: true, mimeType: "inode/directory" },
    { name: "file2.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
    { name: "file3.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
    { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
    { name: "dir2", data: "", isDirectory: true, mimeType: "inode/directory" },
    { name: "file5.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
    { name: "file6.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
    { name: "file7.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
    { name: "file8.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
    { name: "file9.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", isDirectory: false, mimeType: "text/plain" },
  ]
})

export const projectInfo_dir1 = () => ({
  name: "dir1",
  files: [
    { name: "subdir1", data: "", isDirectory: true, mimeType: "inode/directory" },
    { name: "file1.txt", data: "Subdirectory file content here", isDirectory: false, mimeType: "text/plain" },
    { name: "file2.txt", data: "Subdirectory file content here", isDirectory: false, mimeType: "text/plain" },
  ]
})

export const projectInfo_dir2 = () => ({
  name: "dir2",
  files: [
    { name: "subdir2", data: "", isDirectory: true, mimeType: "inode/directory" },
    { name: "file3.txt", data: "Another subdirectory file content", isDirectory: false, mimeType: "text/plain" },
    { name: "file4.txt", data: "Another subdirectory file content", isDirectory: false, mimeType: "text/plain" },
    { name: "file5.txt", data: "Another subdirectory file content", isDirectory: false, mimeType: "text/plain" },
  ]
})
