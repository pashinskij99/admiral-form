// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ActivityTimelineView from "./ActivityTimelineView";

const renderList = arr => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
            <Icon fontSize='1.25rem' icon={item.icon} />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {item.value}
            </Typography>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const AboutOverviewView = props => {
  const { about, contacts, overview, endSignIn, endEvent, startEvent } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <ActivityTimelineView
          endEvent={endEvent}
          endSignIn={endSignIn}
          startEvent={startEvent}
        />
      </Grid>

      <Grid item xs={16} md={4}>
        <Card >
          <CardContent>

            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Contacts
              </Typography>
              {renderList(contacts)}
            </Box>

            <Box>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Overview
              </Typography>
              {renderList(overview)}
            </Box>

          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default AboutOverviewView
