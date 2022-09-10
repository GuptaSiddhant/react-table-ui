/** Deep merge objects */
const deepMerge = <T extends Record<string, any>>(...objects: T[]): T => {
  // Variables
  let target: Record<string, any> = {}

  // Merge the object into the target object
  let merger = (obj: T) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          // If we're doing a deep merge and the property is an object
          target[prop] = deepMerge(target[prop], obj[prop])
        } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop]
        }
      }
    }
  }

  //Loop through each object and conduct a merge
  for (let i = 0; i < objects.length; i++) {
    merger(objects[i])
  }

  return target as T
}

export default deepMerge
