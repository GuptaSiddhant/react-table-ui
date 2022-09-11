import React from 'react'

const Basic = React.lazy(() => import('./Basic'))
const Pagination = React.lazy(() => import('./Pagination'))

const router = {
  Basic: <Basic />,
  Pagination: <Pagination />
}

export default router
