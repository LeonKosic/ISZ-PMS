import { projectInfo, projectInfo_dir1, projectInfo_dir2 } from "./projectContent"

export const mockApi = {
  get: async (url) => {
    console.log(`mockApi: GET ${url}`)

    if (url == '/projects/1')
      return projectInfo()
    else if (url == '/projects/1/dir1')
      return projectInfo_dir1()
    else if (url == '/projects/1/dir2')
      return projectInfo_dir2()
    else if (url == '/projects/1/dir1/subdir1')
      return projectInfo_dir2()
  }
}