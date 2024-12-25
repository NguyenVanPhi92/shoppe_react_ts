export async function downloadFile(url: string, filename: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Clean up the object URL after the download is initiated
    URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Failed to download file:', error)
  }
}
