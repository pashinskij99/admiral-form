// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {formatDate} from "../../@core/utils/formatDate";
import {Modal} from "@mui/material";
import EventFormView from "./EventFormView";

const EventHeaderView = ({eventData, eventId, inputRequired}) => {
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
          mt: 0,

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
              justifyContent: ['center', 'space-between']
            }}
          >
            <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
              <Typography variant='h5' sx={{ mb: 2.5 }}>
                {eventData.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' }}}>
                  <Icon fontSize='1.25rem' icon='tabler:map-pin' />
                  <Typography sx={{ color: 'text.secondary' }}>Odessa, Ukraine</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                  <Icon fontSize='1.25rem' icon='tabler:calendar' />
                  <Typography sx={{ color: 'text.secondary' }}>Start {formatDate(new Date(eventData.eventStart))}</Typography>
                </Box>
              </Box>
            </Box>

            <Button onClick={handleOpen} variant='contained' sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='tabler:check' fontSize='1.125rem' />
              Sign In
            </Button>

            <SignInModal
              open={open}
              handleClose={handleClose}
              inputRequired={inputRequired}
              eventId={eventId}
            />

          </Box>

        </Box>

        <Box sx={{ mb: 6, mt: 6 }}>
          <Typography ml={'0.5rem'} sx={{ color: 'text.secondary' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto consequatur, facere facilis hic mollitia voluptas? Aliquam, architecto ea, eos facere fuga maiores maxime minima natus perferendis porro quo voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid architecto atque blanditiis culpa, cupiditate dolores ducimus esse excepturi facere harum, id, laudantium libero minima odit omnis saepe sapiente voluptatibus?
          </Typography>

        </Box>

      </CardContent>
    </Card>
  )
}

const SignInModal = ({open, handleClose, eventId, inputRequired}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}

    >
      <Box sx={{':focus-visible': {outline: 'none'}, maxWidth: '600px', p: {xs:5, md: 0} }}>
        <EventFormView eventId={eventId} inputRequired={inputRequired} />
      </Box>
    </Modal>
  )
}

export default EventHeaderView
