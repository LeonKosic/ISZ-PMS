// fs -> backend -> frontend (file)
export const remapFields = (file) => ({
  // TODO
})

// pozvati samo nad ByteBuffer-om
export const decodeBytes = (bytes) => {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(bytes)
}