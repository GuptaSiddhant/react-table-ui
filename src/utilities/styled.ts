import { commonClassName } from './createClassName'

const styledLiteral = (
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
  return result.replaceAll('&', `.${commonClassName}`)
}

/** Mock "styled-components" function to trick JS-in-CSS Intellisense */
const styled = (_: string) => styledLiteral

/** Add element shorthands */
styled.rtui = styled('rtui')
styled.div = styled('div')
styled.table = styled('table')

export default styled
