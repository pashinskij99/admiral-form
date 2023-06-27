// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import { styled, useTheme } from '@mui/material/styles'

// ** Hook Import
import { useAuth, useAuthSuperToken } from 'src/hooks/useAuth'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { redirectToAuth } from 'supertokens-auth-react'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import themeConfig from 'src/configs/themeConfig'

const notifications = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

const shortcuts = [
  {
    title: 'Calendar',
    url: '/apps/calendar',
    icon: 'tabler:calendar',
    subtitle: 'Appointments'
  },
  {
    title: 'Invoice App',
    url: '/apps/invoice/list',
    icon: 'tabler:file-invoice',
    subtitle: 'Manage Accounts'
  },
  {
    title: 'User App',
    icon: 'tabler:users',
    url: '/apps/user/list',
    subtitle: 'Manage Users'
  },
  {
    url: '/apps/roles',
    icon: 'tabler:lock',
    subtitle: 'Permissions',
    title: 'Role Management'
  },
  {
    subtitle: 'CRM',
    title: 'Dashboard',
    url: '/dashboards/crm',
    icon: 'tabler:device-analytics'
  },
  {
    title: 'Settings',
    icon: 'tabler:settings',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account'
  },
  {
    icon: 'tabler:help',
    title: 'Help Center',
    url: '/pages/help-center',
    subtitle: 'FAQs & Articles'
  },
  {
    title: 'Dialogs',
    icon: 'tabler:square',
    subtitle: 'Useful Popups',
    url: '/pages/dialog-examples'
  }
]

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const auth = useAuthSuperToken()
  const { push } = useRouter()

  function onLogin(show) {
    // push('/auth')

    push({
      pathname: '/auth',
      query: {
        show: show
      }
    })

    // redirectToAuth({show});
  }

  const theme = useTheme()

  const HeaderTitle = styled(Typography)({
    fontWeight: 700,
    lineHeight: '24px',
    transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
  })

  const LinkStyled = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '10px',
    marginLeft: auth.user ? '10px' : '0'
  })

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden
          ? auth.user && (
              <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
                <Icon fontSize='1.5rem' icon='tabler:menu-2' />
              </IconButton>
            )
          : null}

        <LinkStyled href='/'>
          <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              fill={theme.palette.primary.main}
              d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
            />
            <path
              fill='#161616'
              opacity={0.06}
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
            />
            <path
              fill='#161616'
              opacity={0.06}
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              fill={theme.palette.primary.main}
              d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
            />
          </svg>
          {/* <HeaderTitle variant='h4'>
            {themeConfig.templateName}
          </HeaderTitle> */}
        </LinkStyled>

        {/* {auth.user && <Autocomplete hidden={hidden} settings={settings} />} */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/*<LanguageDropdown settings={settings} saveSettings={saveSettings} />*/}
        {/*<ModeToggler settings={settings} saveSettings={saveSettings} />*/}

        {auth.user ? (
          <>
            {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
            {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
            <UserDropdown settings={settings} />
          </>
        ) : (
          <Box display={'flex'} alignItems={'center'} gap={3}>
            {/* <Link href={`${process.env.WEBSITE_DOMAIN}/auth`}> */}
            <Button onClick={() => onLogin('signin')}>Login</Button>
            {/* </Link> */}

            <Button variant='contained' onClick={() => onLogin('signup')}>
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
