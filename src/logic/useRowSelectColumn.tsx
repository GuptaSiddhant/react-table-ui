import * as React from 'react'
import type {
  Hooks,
  CellProps,
  HeaderProps,
  TableToggleCommonProps
} from 'react-table'
import type { DataType, ReactTableUIProps } from '../utilities/interface'

const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  TableToggleCommonProps
>(({ indeterminate = false, ...rest }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null)
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    if (typeof resolvedRef !== 'function' && resolvedRef?.current)
      resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return <input type='checkbox' ref={resolvedRef} {...rest} />
})

const CheckboxContainer: React.FC = ({ children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }}
  >
    {children}
  </div>
)

const getUseRowSelectColumn = <Data extends DataType>(
  props: ReactTableUIProps<Data>
) => {
  const { Checkbox = IndeterminateCheckbox } = props.rowSelectOptions || {}

  const Header = ({ getToggleAllRowsSelectedProps }: HeaderProps<Data>) => (
    <CheckboxContainer>
      <Checkbox {...getToggleAllRowsSelectedProps()} />
    </CheckboxContainer>
  )

  const Cell = ({ row }: CellProps<Data>) => (
    <CheckboxContainer>
      <Checkbox {...row.getToggleRowSelectedProps()} />
    </CheckboxContainer>
  )

  return (hooks: Hooks<Data>): void => {
    hooks.visibleColumns.push((columns) => [
      {
        id: 'selection',
        minWidth: 20,
        maxWidth: 20,
        sticky: 'left',
        Header,
        Cell
      },
      ...columns
    ])
  }
}
export default getUseRowSelectColumn
