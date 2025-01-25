export const fileExtensions = [
  'txt',
  'csv',
  'md',
  'markdown',
  'm4a',
  'mp3',
  'mpga',
  'mpeg',
  'webm',
  'mp4',
  'wav',
  'pdf',
  'html',
  'pptx',
  'docx',
  'odt',
  'xlsx',
  'xls'
] as const

export type FileExtensions = typeof fileExtensions[number]
export type FileExtensionsWithDot = `.${FileExtensions}`

export const audioAcceptedFormats: Record<string, FileExtensionsWithDot[]> = {
  'audio/x-m4a': ['.m4a'],
  'audio/mpeg': ['.mp3', '.mpga', '.mpeg'],
  'audio/webm': ['.webm'],
  'audio/wav': ['.wav']
}

export const videoAcceptedFormats: Record<string, FileExtensionsWithDot[]> = {
  'video/mp4': ['.mp4']
}

export const acceptedFormats: Record<string, FileExtensionsWithDot[]> = {
  'text/plain': ['.txt'],
  'text/csv': ['.csv'],
  'text/markdown': ['.md', '.markdown'],
  'audio/x-m4a': ['.m4a'],
  'audio/mpeg': ['.mp3', '.mpga', '.mpeg'],
  'audio/webm': ['.webm'],
  'video/mp4': ['.mp4'],
  'audio/wav': ['.wav'],
  'application/pdf': ['.pdf'],
  'text/html': ['.html'],

  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.oasis.opendocument.text': ['.odt'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls']
}
