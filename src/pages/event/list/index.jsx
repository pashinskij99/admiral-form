import styled from "@emotion/styled"
import {Button, Tab, Typography} from "@mui/material"
import {Box} from "@mui/system"
import Link from "next/link"
import PageHeader from "src/@core/components/page-header"
import EventListView from "src/views/event/list/EventListView"
import Icon from 'src/@core/components/icon'
import {adminUserIdFake} from "src/config/adminUserIdFake"
import {
  useGetEventsListCurrentQuery,
  useGetEventsListPastQuery,
  useRemoveEventMutation
} from "../../../store/apps/eventsListRTK";
import {useState} from "react";
import {TabList} from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

const EventList = () => {
  const [paginationModelCurrent, setPaginationModelCurrent] = useState({page: 0, pageSize: 10})
  const [paginationModelPast, setPaginationModelPast] = useState({page: 0, pageSize: 10})
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangePageCurrent = (paginationOptions) => {
    setPaginationModelCurrent({page: paginationOptions.page, pageSize: 10})
  }

  const handleChangePagePast = (paginationOptions) => {
    setPaginationModelPast({page: paginationOptions.page, pageSize: 10})
  }

  const {
    data: eventsListCurrent,
    isFetching: isFetchingCurrent
  } = useGetEventsListCurrentQuery({
    userId: adminUserIdFake,
    limit: 10,
    page: paginationModelCurrent.page + 1
  })

  const {
    data: eventsListPast,
    isFetching: isFetchingPast
  } = useGetEventsListPastQuery({
    userId: adminUserIdFake,
    limit: 10,
    page: paginationModelPast.page + 1
  })

  const [removeEvent] = useRemoveEventMutation()

  return (
    <Box display={'flex'} flexDirection={'column'} gap={5}>
      <Box flexWrap={'wrap'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={5}>
        <PageHeader
          title={
            <Typography variant='h4'>
              <LinkStyled href='https://github.com/react-hook-form/react-hook-form' target='_blank'>
                Event List
              </LinkStyled>
            </Typography>
          }
          subtitle={
            <Typography sx={{color: 'text.secondary'}}>
              Fill in the required fields to create an event
            </Typography>
          }
        />
        <Link href={'/event/create'}>
          <Button variant='contained' sx={{'& svg': {mr: 2}}}>
            <Icon icon='tabler:plus'/>
            Add Event
          </Button>
        </Link>
      </Box>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='nav tabs example'>
          <Tab value='1' component='a' label='Current Events' href='/drafts' onClick={e => e.preventDefault()} />
          <Tab value='2' component='a' label='Past Events' href='/trash' onClick={e => e.preventDefault()} />
        </TabList>
        <TabPanel sx={{ padding: 0 }} value='1'>
          <EventListView
            isFetching={isFetchingCurrent}
            data={eventsListCurrent}
            handleChangePage={handleChangePageCurrent}
            paginationModel={paginationModelCurrent}
            removeEvent={removeEvent}
          />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value='2'>
          <EventListView
            isFetching={isFetchingPast}
            data={eventsListPast}
            handleChangePage={handleChangePagePast}
            paginationModel={paginationModelPast}
            removeEvent={removeEvent}
          />
        </TabPanel>
      </TabContext>

    </Box>
  )
}

const LinkStyled = styled(Link)(({theme}) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

export default EventList
