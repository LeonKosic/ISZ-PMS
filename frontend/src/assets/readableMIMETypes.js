export const readableMIMETypes = [
  'text/plain',
  'text/html',
  'text/css',
  'text/javascript',
  'text/markdown',
  'text/csv',
  'application/json',
  'application/xml',
  'application/javascript',
  'application/xhtml+xml'
];

export const isReadable = (mime) => {
  return readableMIMETypes.find((e) => e == mime) || mime.match("text/*");
}
