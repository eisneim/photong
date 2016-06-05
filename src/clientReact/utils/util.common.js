export function getFileSize(size) {
  const mbsize = 1024 * 1024
  if (size > mbsize) {
    return (size / mbsize).toFixed(2) + 'Mb'
  } else if (size > 100) {
    return (size / 1024).toFixed(2) + 'Kb'
  }
  return size + 'B'
}