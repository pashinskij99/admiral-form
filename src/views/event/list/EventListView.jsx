// ** React Imports
import { useEffect, useState } from 'react'
import { formatDate } from 'src/@core/utils/formatDate'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Utils Import
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import Link from 'next/link'
import Tooltip from '@mui/material/Tooltip'
import styled from '@emotion/styled'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const defaultColumns = [
  {
    flex: 0.210,
    minWidth: 260,
    field: 'name',
    headerName: 'Name',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.name}
            </Typography>
            <Typography
              noWrap
              variant='caption'
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              {row.description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    type: 'date',
    minWidth: 100,
    headerName: 'Event Start',
    field: 'eventStart',
    valueGetter: params => new Date(params.value),
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {formatDate(new Date(params.row.eventStart))}
      </Typography>
    )
  },
  {
    flex: 0.1,
    type: 'date',
    minWidth: 100,
    headerName: 'Event End',
    field: 'eventEnd',
    valueGetter: params => new Date(params.value),
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {formatDate(new Date(params.row.eventEnd))}
      </Typography>
    )
  },

  // {
  //   flex: 0.1,
  //   type: 'date',
  //   field: 'eventEndSignIn',
  //   minWidth: 100,
  //   headerName: 'Finish sign',
  //   valueGetter: params => new Date(params.value),
  //   renderCell: params => (
  //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //       {formatDate(new Date(params.row.eventEndSignIn))}
  //     </Typography>
  //   )
  // }
]

const getRows = (defaultData = [], filteredData = [], searchText, {type = 'default'}) => {
  const switchObject = {
    getNullData: [],
    getFilteredData: filteredData,
    default: defaultData,
  }

  if(searchText.length) {
    return switchObject['getFilteredData']
  } else {
    return switchObject[type]
  }
}

const StyledDataGrid = styled(DataGrid)`
  select {
    display: none;
  }

`

const EventListView = ({ data = { data: [] }, paginationModel, handleChangePage, isFetching, removeEvent }) => {
  // ** States
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [editValue, setEditValue] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field]?.toString())
      })
    })

    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const onSubmit = e => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

  const handleRemoveEvent = eventId => {
    removeEvent(eventId)
  }
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Event' placement='top'>
            <Link target='_blank' href={`/event/${row.id}`}>
              <IconButton sx={{
                  width: '1.6em',
                }}>
                <Icon icon='majesticons:open' />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title='Statistics' placement='top'>
            <Link href={`/event/statistics/${row.id}`}>
              <IconButton>
                <Icon icon='tabler:eye' fontSize={20} />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title='Edit' placement='top'>
            <Link target='_blank' href={`/event/edit/${row.id}`}>
              <IconButton>
                <Icon icon='tabler:edit' />
              </IconButton>
            </Link>
          </Tooltip>



          <Tooltip title='Delete' placement='top'>
            <IconButton onClick={() => handleRemoveEvent(row.id)}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>


        </Box>
      )
    }
  ]

  return (
    <Card
      sx={{
        padding: 0,
        pt: 2,
      }}
    >
      <StyledDataGrid
        loading={isFetching}
        autoHeight
        paginationMode={'server'}
        rowCount={data?.total}
        columns={columns}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={handleChangePage}
        rows={getRows(data?.data, filteredData, searchText, {})}

        // rows={filteredData.length ? filteredData : data?.data}
        pageSizeOptions={[10]}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '1.125rem',
          },
          '& .MuiBox-root.css-12hr0br': {
            display: 'none'
          }
        }}

        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value),
          }
        }}
      />

      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Edit Permission
          </Typography>
          <Typography variant='body2'>Edit permission as per your requirements.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box component='form' onSubmit={onSubmit}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <CustomTextField
                fullWidth
                value={editValue}
                label='Permission Name'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                placeholder='Enter Permission Name'
                onChange={e => setEditValue(e.target.value)}
              />

              <Button type='submit' variant='contained' sx={{ mt: 4 }}>
                Update
              </Button>
            </FormGroup>
            <FormControlLabel control={<Checkbox />} label='Set as core permission' />
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default EventListView
