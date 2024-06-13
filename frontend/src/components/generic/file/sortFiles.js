const sortFiles = (files) => {
  files = files.sort(
    (a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return 0;
    }
  )

  return files;
}

export default sortFiles;