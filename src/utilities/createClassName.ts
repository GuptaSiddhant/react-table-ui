export const styled: (
  e: string
) => (literals: TemplateStringsArray, ...args: string[]) => string = () => (
  literals,
  ...args
) => {
  let result = ''
  // interleave the literals with the placeholders
  for (let i = 0; i < args.length; i++) {
    result += literals[i]
    result += args[i]
  }
  // add the last literal
  result += literals[literals.length - 1]
  return result
}

export const commonClassName = 'RTUI'

export const createClassName = (...classNames: string[]) =>
  [commonClassName, ...classNames].join(' ')

export default createClassName
