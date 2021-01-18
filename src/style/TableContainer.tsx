import styled from 'styled-components'

export const TableContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  &,
  > * {
    box-sizing: border-box;
  }

  .table {
    height: 100%;
    min-width: 100%;
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 5;
        width: 100%;
      }

      .header {
        top: 0;

        .td,
        .th {
          box-shadow: 0px 3px 3px #ccc;
        }
      }

      .footer {
        bottom: 0;

        .td,
        .th {
          box-shadow: 0px -3px 3px #ccc;
        }
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`

export default TableContainer
