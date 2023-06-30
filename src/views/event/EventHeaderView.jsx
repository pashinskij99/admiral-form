// ** React Imports
import { useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

// ** Third Party Imports

// ** Icon Imports
import { Modal } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { formatDate } from '../../@core/utils/formatDate'
import EventFormView from './EventFormView'

const EventHeaderView = ({ eventData, eventId, inputRequired }) => {
  // ** State
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image={'/images/pages/profile-banner.png'}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 5,
          mt: 0
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              ml: 2,
              alignItems: 'flex-end',
              flexWrap: ['wrap', 'nowrap'],
              justifyContent: ['start', 'space-between']
            }}
          >
            <Box sx={{ mb: [0, 0], display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant='h5' sx={{ mb: 2.5 }}>
                {eventData.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start'],
                  flexDirection: ['column', 'row'],
                  gap: ['10px', 0]
                }}
              >
                <Box
                  sx={{
                    mr: 4,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, color: 'text.secondary' }
                  }}
                >
                  <Icon fontSize='1.25rem' icon='tabler:map-pin' />
                  <Typography sx={{ color: 'text.secondary' }}>Odessa, Ukraine</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                  <Icon fontSize='1.25rem' icon='tabler:calendar' />
                  <Typography sx={{ color: 'text.secondary' }}>
                    {formatDate(new Date(eventData.eventStart))} - {formatDate(new Date(eventData.eventEnd))}
                  </Typography>
                </Box>
              </Box>
            </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button onClick={handleOpen} variant='contained' sx={{ '& svg': { mr: 2 } }}>
                  {/* <Icon icon='tabler:check' fontSize='1.125rem' /> */}
                  Sign In
                </Button>
              </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 3, mt: 7 }}>
          <Typography ml={'0.5rem'} sx={{ color: 'text.secondary' }}>
            {eventData.description}
          </Typography>

          <Box sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'end' }}>
            <Button onClick={handleOpen} variant='contained' sx={{ '& svg': { mr: 2 } }}>
              {/* <Icon icon='tabler:check' fontSize='1.125rem' /> */}
              Sign In
            </Button>
          </Box>
        </Box>

        <SignInModal open={open} handleClose={handleClose} inputRequired={inputRequired} eventId={eventId} />
      </CardContent>
    </Card>
  )
}

const SignInModal = ({ open, handleClose, eventId, inputRequired }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Box sx={{ ':focus-visible': { outline: 'none' }, maxWidth: '600px', p: { xs: 5, md: 0 } }}>
        <EventFormView eventId={eventId} inputRequired={inputRequired} handleClose={handleClose} />
      </Box>
    </Modal>
  )
}

export default EventHeaderView
