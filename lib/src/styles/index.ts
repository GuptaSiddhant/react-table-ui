import styled from '../utilities/styled'

import { ButtonStyle } from '../common/Button'
import { CellStyle } from '../common/Cell'

import commonStyle from './commonStyle'
import containerStyle from './containerStyle'
import TableStyle from './TableStyle'
import TitleBarStyle from './TitleBarStyle'
import menuStyle from './menuStyle'

const styles = styled.rtui`
  ${containerStyle}
  ${commonStyle}
  ${menuStyle}
  ${ButtonStyle}
  ${TitleBarStyle}
  ${TableStyle}
  ${CellStyle}
`

export default styles
