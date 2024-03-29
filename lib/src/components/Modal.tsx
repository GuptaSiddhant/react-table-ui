import * as React from 'react'

import Icon from '../common/Icon'
import Button from '../common/Button'
import FocusTrap from '../common/FocusTrap'
import type { DataType } from '../types'
import useTableContext from '../context'

export default function Modal<Data extends DataType>(): JSX.Element | null {
  const context = useTableContext<Data>()
  const {
    state: { modal },
    resetModal
  } = context.tableInstance
  const text = context.tableProps.localeOptions?.text

  const handleSave = () => {
    modal?.onSave && modal.onSave()
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
