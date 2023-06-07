// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import BasicEventForm from 'src/views/event/create/BasicEventForm'
import { adminUserIdFake } from 'src/config/adminUserIdFake'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

export const getServerSideProps = async (ctx) => {
  const userId = adminUserIdFake

  return {
    props: {
      id: userId
    }
  }
}

const EventForm = ({id}) => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h4'>
              <LinkStyled href='https://github.com/react-hook-form/react-hook-form' target='_blank'>
                Create Event
              </LinkStyled>
            </Typography>
          }
          subtitle={
            <Typography sx={{ color: 'text.secondary' }}>
              Fill in the required fields to create an event
            </Typography>
          }
        />
        <Grid item xs={12}>
          <BasicEventForm userId={id} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default EventForm