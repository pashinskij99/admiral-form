// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import Icon from '../../../@core/components/icon'
import Pagination from '@mui/material/Pagination'
import { PaginationItem } from '@mui/material'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

const mockData = [
  {
    flex: 0.1,
    minWidth: 130,
    nameBack: 'emailRequired',
    field: 'email',
    headerName: 'email'
  },
  {
    flex: 0.1,
    minWidth: 100,
    nameBack: 'telephoneRequired',
    headerName: 'Telephone',
    field: 'telephone'
  },
  {
    flex: 0.1,
    minWidth: 130,
    nameBack: 'instagramRequired',
    headerName: 'Instagram',
    field: 'instagram'
  },
  {
    flex: 0.1,
    minWidth: 130,
    nameBack: 'telegramRequired',
    headerName: 'Telegram',
    field: 'telegram'
  },
  {
    flex: 0.1,
    minWidth: 130,
    nameBack: 'twitterRequired',
    headerName: 'Twitter',
    field: 'twitter'
  },
  {
    flex: 0.1,
    minWidth: 130,
    nameBack: 'viberRequired',
    headerName: 'Viber',
    field: 'viber'
  },
  {
    flex: 0.1,
    minWidth: 130,
    nameBack: 'whatsappRequired',
    headerName: 'Whatsapp',
    field: 'whatsapp'
  },
  {
    flex: 0.1,
    minWidth: 130,
    nameBack: 'facebookRequired',
    headerName: 'Facebook',
    field: 'facebook'
  },
]

const TableUsers = ({ membersData, paginationModel, handleChangePage, isFetching, requiredInputs }) => {

  const getUsersCol = (requiredInputs) => {
    const result = []
    for (let i = 0; i < requiredInputs.length; i++) {
      const require = requiredInputs[i]
      for (let j = 0; j < mockData.length; j++) {
        const mock = mockData[j]

        if(mock.nameBack === require[0]) result.push(mock)
      }
    }

    return result
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 160,
      field: 'full_name',
      headerName: 'Name'
    },
    ...getUsersCol(requiredInputs)

    // {
    //   flex: 0.2,
    //   minWidth: 200,
    //   field: 'email',
    //   headerName: 'Email'
    // },
    // {
    //   flex: 0.15,
    //   minWidth: 130,
    //   headerName: 'Telephone',
    //   field: 'telephone'
    // },
    // {
    //   flex: 0.15,
    //   minWidth: 120,
    //   field: 'social',
    //   headerName: 'Social Links'

    //   // renderCell: row => {
    //   //   const social = Object.entries(row.row)
    //   //
    //   //   return (
    //   //     <Box sx={{display: 'flex', alignItems: 'center'}}>
    //   //       {social.map(([key, value]) => {
    //   //         return (
    //   //           <Tooltip key={key} title={row.row.facebook} placement="top">
    //   //             <Link href={`/event/edit/${row.id}`}>
    //   //               <IconButton>
    //   //                 <Icon icon={`uil:${key}`}/>
    //   //               </IconButton>
    //   //             </Link>
    //   //           </Tooltip>
    //   //         )
    //   //       })}
    //   //
    //   //     </Box>
    //   //   )
    //   // }
    // }
  ]

  const newRows = membersData?.data.map(item => {
    return {
      ...item,
      full_name: item.name + ' ' + item.surname
    }
  })

  return (
    <Card>
      <CardHeader component={() => <CardHeaderContent rows={newRows} total={membersData?.total} />} />
      <Box sx={{ height: 500 }}>
        <StyledDataGrid
          paginationMode={'server'}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={handleChangePage}
          loading={isFetching}
          rows={newRows || []}
          rowCount={membersData?.total}
        />
      </Box>
    </Card>
  )
}

const StyledDataGrid = styled(DataGrid)`
  & .MuiTablePagination-displayedRows.css-1546fgl-MuiTablePagination-displayedRows {
    display: none;
  }
`

const CardHeaderContent = ({ rows, total }) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mr={'24px'}>
      <Box>
        <Typography fontSize={'18px'} fontWeight={'500'} ml={'24px'} mt={'24px'}>
          Table of users
        </Typography>
        <Typography fontSize={'14px'} ml={'24px'} mb={'24px'}>
          Total number of users signed-up can be seen on top of table
        </Typography>
      </Box>
      <Box className={'MuiTablePagination-displayedRows css-1546fgl-MuiTablePagination-displayedRows'}>
        Total users: {total}
      </Box>
    </Box>
  )
}

export { TableUsers }
