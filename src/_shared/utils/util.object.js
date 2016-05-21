export function copyTo(to = {}, fromObj, propsArray) {
  if (!fromObj) return undefined

  return propsArray.reduce((obj, key) => {
    if (fromObj[key])
      obj[key] = fromObj[key]

    return obj
  }, to)
}