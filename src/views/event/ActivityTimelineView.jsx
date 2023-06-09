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

const ActivityTimelineView = () => {
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
              <TimelineDot color='primary' />
              <TimelineConnector />
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
                  Create Event
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  2 Days Ago
                </Typography>
              </Box>
              <Typography variant='body2'>Event registered on our service</Typography>
            </TimelineContent>
          </TimelineItem>

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
                  In 5 days
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
                  In 6 days
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
                  In 12 days
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
