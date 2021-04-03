export const commonClassName = 'RTUI'

export const createClassName = (...classNames: string[]) =>
  [ ...classNames].join(' ')

export default createClassName
