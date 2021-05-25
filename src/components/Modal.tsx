import * as React from 'react'

import Icon from '../common/Icon'
import Button from '../common/Button'
import FocusTrap from '../common/FocusTrap'
import type { DataType, TableContext } from '../types'

const Modal = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  const {
    state: { modal },
    resetModal
  } = context.tableInstance
  const text = context.tableProps.localeOptions?.text

  const handleSave = () => {
    modal?.onSave?.()
    resetModal()
  }

  return modal ? (
    <div className='Modal-Wrapper' onClick={resetModal}>
      <FocusTrap className='Modal' onClick={(e) => e.stopPropagation()}>
        <div className='TitleBar'>
          {modal.title}
          <div>
            {modal.onSave && (
              <Button onClick={handleSave}>
                <div className='iconWithLabel'>
                  <Icon name='save' />
                  <div>{text?.save || 'Save'}</div>
                </div>
              </Button>
            )}
            <Button onClick={resetModal}>
              <Icon name='x' />
            </Button>
          </div>
        </div>
        <div className='Modal-Content'>{modal.children}</div>
      </FocusTrap>
    </div>
  ) : null
}

export default Modal
