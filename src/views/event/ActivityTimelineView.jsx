// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import OptionsMenu from 'src/@core/components/option-menu'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityTimelineView = ({endSignIn, endEvent, startEvent}) => {
  const dateEndSignIn = new Date(endSignIn);
  const dateStartEvent = new Date(startEvent);
  const dateEndEvent = new Date(endEvent);

  const differenceInTimeEventStart = dateStartEvent.getTime() - new Date().getTime();
  const differenceInTimeEventEnd = dateEndEvent.getTime() - new Date().getTime();
  const differenceInTimeEventSignIn = dateEndSignIn.getTime() - new Date().getTime();

  const differenceInDaysEventStart = Math.ceil(differenceInTimeEventStart / (1000 * 3600 * 24));
  const differenceInDaysEventEnd = Math.ceil(differenceInTimeEventEnd / (1000 * 3600 * 24));
  const differenceInDaysEventSignIn = Math.ceil(differenceInTimeEventSignIn / (1000 * 3600 * 24));

  const getValueInTimeLine = (date) => {
    if(date > 0) return `In ${date} days`
    if(date < 0) return `${Math.abs(date)} days ago`
    return `Today`
  }

  return (
    <Card>
      <CardHeader
        title='Activity Timeline'
        sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
        titleTypographyProps={{ sx: { color: 'text.primary' } }}
        avatar={<Icon fontSize='1.25rem' icon='tabler:list-details' />}
      />
      <CardContent>
        <Timeline>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='warning' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='h6' sx={{ mr: 2 }}>
                  Event end sign in
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {getValueInTimeLine(differenceInDaysEventSignIn)}
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 3 }}>
                Registration for the event ends.
              </Typography>

            </TimelineContent>
          </TimelineItem>


          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='h6' sx={{ mr: 2 }}>
                  Start Event
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {getValueInTimeLine(differenceInDaysEventStart)}
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 3 }}>
                Start this event
              </Typography>

            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='secondary' />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='h6' sx={{ mr: 2 }}>
                  End event
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {getValueInTimeLine(differenceInDaysEventEnd)}
                </Typography>
              </Box>
              <Typography variant='body2'>End this event</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimelineView
