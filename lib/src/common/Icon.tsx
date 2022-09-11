import React from 'react'

export default function Icon({ name }: { name: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather-icon'
    >
      {getIconContent(name)}
    </svg>
  )
}

function getIconContent(name: string): JSX.Element | null {
  switch (name) {
    case 'maximize':
    case 'maximise':
      return (
        <path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' />
      )
    case 'minimize':
    case 'minimise':
      return (
        <path d='M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3' />
      )
    case 'filter':
      return <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
    case 'search':
      return (
        <React.Fragment>
          <circle cx='11' cy='11' r='8' />
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </React.Fragment>
      )
    case 'x':
    case 'close':
    case 'cancel':
      return (
        <React.Fragment>
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </React.Fragment>
      )
    case 'chevron-right':
      return <polyline points='9 18 15 12 9 6' />
    case 'chevron-left':
      return <polyline points='15 18 9 12 15 6' />
    case 'chevrons-right':
      return (
        <React.Fragment>
          <polyline points='13 17 18 12 13 7' />
          <polyline points='6 17 11 12 6 7' />
        </React.Fragment>
      )
    case 'chevrons-left':
      return (
        <React.Fragment>
          <polyline points='11 17 6 12 11 7' />
          <polyline points='18 17 13 12 18 7' />
        </React.Fragment>
      )
    case 'sliders':
      return (
        <React.Fragment>
          <line x1='4' y1='21' x2='4' y2='14' />
          <line x1='4' y1='10' x2='4' y2='3' />
          <line x1='12' y1='21' x2='12' y2='12' />
          <line x1='12' y1='8' x2='12' y2='3' />
          <line x1='20' y1='21' x2='20' y2='16' />
          <line x1='20' y1='12' x2='20' y2='3' />
          <line x1='1' y1='14' x2='7' y2='14' />
          <line x1='9' y1='8' x2='15' y2='8' />
          <line x1='17' y1='16' x2='23' y2='16' />
        </React.Fragment>
      )
    case 'save':
      return (
        <React.Fragment>
          <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' />
          <polyline points='17 21 17 13 7 13 7 21' />
          <polyline points='7 3 7 8 15 8' />
        </React.Fragment>
      )

    default:
      return null
  }
}
