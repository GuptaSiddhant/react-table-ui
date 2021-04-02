export const commonClassName = 'RTUI'

export const createClassName = (...classNames: string[]) =>
  [commonClassName, ...classNames].join(' ')

export default createClassName
