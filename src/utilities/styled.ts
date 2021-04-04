import { commonClassName } from './createClassName'

/** Mock "styled-components" function to trick JS-in-CSS Intellisense */
const styled = (element: string) => (
  literals: TemplateStringsArray,
  ...args: string[]
): string => {
  let result = ''

  // interleave the literals with the placeholders
  for (let i = 0; i < args.length; i++) {
    result += literals[i]
    result += args[i]
  }
  // add the last literal
  result += literals[literals.length - 1]

  // Replace "&" with common className
  const replacementClassName = [commonClassName, element]
    .filter((str) => !!str)
    .map((c) => `.${c}`)
    .join(' ')
  return result.replaceAll('&', replacementClassName)
}

/** Add element shorthands */
styled.div = styled('')
styled.rtui = styled('RTUI')
styled.table = styled('Table')

export default styled
