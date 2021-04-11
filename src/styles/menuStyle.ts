import styled from '../utilities/styled'
import { color, radius, spacing } from './theme'

export default styled.div`
  :root {
    --reach-menu-button: 1;
  }

  [data-reach-menu],
  [data-reach-menu-popover] {
    display: block;
    position: absolute;
  }

  [data-reach-menu][hidden],
  [data-reach-menu-popover][hidden] {
    display: none;
  }

  [data-reach-menu-list],
  [data-reach-menu-items] {
    display: block;
    white-space: nowrap;
    border: solid 1px ${color.border.default};
    background: hsla(0, 100%, 100%, 0.99);
    outline: none;
    padding: ${spacing.sm} 0;
    font-size: 85%;
    border-radius: ${radius.sm};
  }

  [data-reach-menu-item] {
    display: block;
    user-select: none;

    /* reach-menu-item */
    cursor: pointer;

    /* a */
    display: block;
    color: inherit;
    font: inherit;
    text-decoration: initial;

    /* both */
    padding: ${spacing.md} ${spacing.xl};

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${spacing.md};
  }

  /* pseudo pseudo selector */
  [data-reach-menu-item][data-selected] {
    background: ${color.background.selected};
    color: ${color.text.selected};
    outline: none;
  }

  [data-reach-menu-item][aria-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
