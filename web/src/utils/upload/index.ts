export function createFileChunks(file: File, chunkSize: number) {
  const chunks = []
  // 计算一共要切多少片
  const count = Math.ceil(file.size / chunkSize)
  for (let i = 0; i < count; i++) {
    const curChunk = file.slice(i * chunkSize, (i + 1) * chunkSize)
    chunks.push({
      chunk: curChunk,
      chunkIndex: i,
    })
  }
  return chunks
}

export async function getFileHashName(file: File) {
  const fileHash = await calculateFileHash(file)
  return fileHash
}

export async function calculateFileHash(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
  return bufferToHex(hashBuffer)
}

/**
 * 把ArrayBuffer转成16进制的字符串
 * @param {*} buffer
 * @returns
 */
function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
