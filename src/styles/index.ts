import styled from '../utilities/styled'

import { IconButtonStyle } from '../common/IconButton'
import { CellStyle } from '../common/Cell'

import commonStyle from './commonStyle'
import containerStyle from './containerStyle'
import TableStyle from './TableStyle'
import TitleBarStyle from './TitleBarStyle'

const styles = styled.rtui`
  ${containerStyle}
  ${commonStyle}
  ${IconButtonStyle}
  ${TitleBarStyle}
  ${TableStyle}
  ${CellStyle}
`

export default styles
