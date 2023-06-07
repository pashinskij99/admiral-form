// ** Next Import
import Link from 'next/link'
import Session from 'supertokens-node/recipe/session'
import supertokensNode from 'supertokens-node'
import { backendConfig } from '../config/backendConfig'
import { signOut } from 'supertokens-auth-react/recipe/session'
import SessionWeb from 'supertokens-web-js/recipe/session';

// import ThirdPartyEmailPasswordNode from 'supertokens-node/recipe/thirdpartyemailpassword'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

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

  supertokensNode.init(backendConfig())

  let session

  try {
      session = await Session.getSession(ctx.req, ctx.res, {
      overrideGlobalClaimValidators: () => {
        return []
      }})
  } catch (err) {
      if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
          return { props: { fromSupertokens: 'needs-refresh' } }
      } else if (err.type === Session.Error.UNAUTHORISED) {
          return { props: { fromSupertokens: 'needs-refresh' } }
      }

      throw err
  }

  // const date = await Session.getAccessTokenPayloadSecurely()
  // console.log(date);

  return {
      props: {
        id: userId,
        userId: session.getUserId(),
      },
  }
}

const HomePage = ({id, userId, user}) => {

  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <BasicEventForm userId={id} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default HomePage
