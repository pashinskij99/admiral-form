// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const StyledCompanyName = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Typography
        sx={{
          mr: 2,
          color: 'text.secondary',
          display: 'flex',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}
      >
        {/*{`© ${new Date().getFullYear()}, Made with `}*/}
        {/*<Box component='span' sx={{ mx: 1, color: 'error.main' }}>*/}
        {/*  ❤️*/}
        {/*</Box>*/}
        {/*{`by`}*/}
        {/*<Typography sx={{ ml: 1 }} target='_blank' href='https://pixinvent.com' component={StyledCompanyName}>*/}
        {/*  Pixinvent*/}
        {/*</Typography>*/}
        Copyright © 2023
        <Typography sx={{ ml: 1 }} target='_blank' href='https://pixinvent.com' component={StyledCompanyName}>
          Admiral Studios.&nbsp;
        </Typography>
        All rights reserved.
      </Typography>
      {/*{hidden ? null : (*/}
      {/*  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>*/}
      {/*    <Typography target='_blank' component={LinkStyled} href='https://themeforest.net/licenses/standard'>*/}
      {/*      License*/}
      {/*    </Typography>*/}
      {/*    <Typography target='_blank' component={LinkStyled} href='https://1.envato.market/pixinvent_portfolio'>*/}
      {/*      More Themes*/}
      {/*    </Typography>*/}
      {/*    <Typography*/}
      {/*      target='_blank'*/}
      {/*      component={LinkStyled}*/}
      {/*      href='https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation'*/}
      {/*    >*/}
      {/*      Documentation*/}
      {/*    </Typography>*/}
      {/*    <Typography target='_blank' component={LinkStyled} href='https://pixinvent.ticksy.com'>*/}
      {/*      Support*/}
      {/*    </Typography>*/}
      {/*  </Box>*/}
      {/*)}*/}
    </Box>
  )
}

export default FooterContent
