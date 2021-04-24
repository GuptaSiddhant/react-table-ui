import styled from '../utilities/styled'
import { border, radius, color, spacing } from '../utilities/theme'
import StatusBarStyle from './StatusBarStyle'

const ModalStyles = styled('Modal')`
  & {
    min-width: 300px;
    min-height: 200px;
    background-color: ${color.background.secondary};
    border-radius: ${radius.md};
    overflow: hidden;
  }

  & .TitleBar {
    width: 100%;
    min-height: 3rem;
    height: auto;
    padding-left: ${spacing.xl};

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-weight: bold;
    border-bottom: ${border.default};
    background-color: ${color.background.primary};
  }

  & .Modal-Content {
    padding: ${spacing.xl};
  }
`

export default styled.div`
  &,
  & * {
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
  }

  & {
    position: relative;
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    height: 100%;
    width: 100%;
    color: ${color.text.primary};
  }

  &.withBorder {
    border: ${border.default};
    border-radius: ${radius.md};
    overflow: hidden;
  }

  &:fullscreen {
    border-radius: 0;
  }

  & .Modal-Wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${StatusBarStyle}
  ${ModalStyles}
`
