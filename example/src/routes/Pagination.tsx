import React from 'react'
import { Column, UsePaginationState, TableInstance } from 'react-table'
import ReactTableUI, { MultiRowAction, TableAction } from 'react-table-ui'
import type { DataType, SingleRowAction } from 'react-table-ui'

interface Passenger extends DataType {
  _id: string
  name: string
  trips: number
  airline: {
    id: number
    name: string
    country: string
    logo: string
    slogan: string
    website: string
    established: string
  }[]
}

export default function App() {
  const {
    fetchData,
    data,
    columns,
    loading,
    pageCount,
    recordCount
  } = usePassengersAPI()

  const tableInstanceRef = React.useRef<TableInstance<Passenger>>(null)

  const singleRowActions: SingleRowAction<Passenger>[] = [
    {
      id: 'log',
      tooltip: 'Console log',
      onClick: console.log,
      children: <div>🪵 Console log a long message</div>
    }
  ]

  const multiRowActions: MultiRowAction<Passenger>[] = [
    {
      id: 'log',
      tooltip: 'Console log',
      onClick: console.log,
      children: '🪵'
    }
  ]

  const tableActions: TableAction<Passenger>[] = [
    {
      id: 'load',
      tooltip: 'Reload',
      onClick: () => {
        const state = tableInstanceRef.current?.state
        if (state) {
          fetchData({ pageIndex: state.pageIndex, pageSize: state.pageSize })
        }
      },
      children: '🔄'
    }
  ]

  return (
    <ReactTableUI
      title='Table with pagination'
      data={data}
      columns={columns}
      tableInstanceRef={tableInstanceRef}
      loadingOptions={{ loading }}
      actionOptions={{
        singleRowActions,
        multiRowActions,
        tableActions
      }}
      paginationOptions={{
        manualPagination: true,
        pageCount,
        fetchData,
        recordCount
      }}
      styleOptions={{}}
    />
  )
}

function usePassengersAPI() {
  const [passengers, setPassengers] = React.useState<Passenger[]>([])
  const [pageCount, setPageCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [totalPassengers, setTotalPassengers] = React.useState(0)

  const fetchData = React.useCallback(
    async ({ pageSize, pageIndex }: UsePaginationState<any>) => {
      setLoading(true)
      const jsonRes = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${pageIndex}&size=${pageSize}`
      )
        .then((res) => res.json())
        .catch(console.error)
        .finally(() => setLoading(false))

      setPassengers(jsonRes?.data || [])
      setPageCount(jsonRes?.totalPages || 0)
      setTotalPassengers(jsonRes?.totalPassengers || 0)
    },
    []
  )

  const columns: Column<Passenger>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        sticky: 'left',
        accessor: 'name'
      },
      {
        Header: 'Trips',
        accessor: 'trips'
      },

      {
        Header: 'Name',
        accessor: 'airline.name'
      },
      {
        Header: 'Country',
        accessor: 'airline.country'
      },
      {
        Header: 'Established',
        accessor: 'airline.established'
      }
    ],
    []
  )

  return {
    fetchData,
    pageCount,
    columns,
    data: passengers,
    loading,
    recordCount: totalPassengers
  }
}
