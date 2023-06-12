// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { getHashOfString } from 'src/@core/utils/getHashOfString'
import { normalizeHash } from 'src/@core/utils/normalizeHash'
import { useAuthSuperToken } from 'src/hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from 'src/store/apps/profileTab'
import Link from 'next/link'
import { List, ListItem } from '@mui/material'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const UserDropdown = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const profileBtnRef = useRef(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuthSuperToken()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    setAnchorEl(null)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'inherit'
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleClickOutside = (e) => {
    if(profileBtnRef.current) {
      if (!profileBtnRef.current.contains(e.target)) handleClose()
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  const handleRoute = (url) => {
    handleClose()

    router.push(url)
  }

  const userImage = false

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleOpen}
        sx={{ ml: 2, cursor: 'pointer', position: 'relative' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {
          userImage
            ? (
              <Avatar
                alt='John Doe'
                src='/images/avatars/1.png'
                onClick={handleOpen}
                ref={profileBtnRef}
                sx={{ width: 38, height: 38 }}
              />
            )
            : <Box
              ref={profileBtnRef}
              onClick={handleOpen}
              sx={{
                background: HSLtoString(generateHSL('Yaroslav Pashinskiy')),
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                lineHeight: '1'
              }}
            >
              Y
            </Box>
        }

        <Box
          sx={{
            background: 'white',
            width: '230px',
            position: 'absolute',
            top: '65px',
            paddingTop: '8px',
            paddingBottom: '8px',
            right: 0,
            boxShadow: '0px 4px 11px 0px rgba(47, 43, 61, 0.16)',
            borderRadius: "6px",
            transition: "opacity 287ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 191ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            opacity: open ? 1 : 0,
            touchAction: open ? 'auto' : 'none',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: "0.4375rem",
              paddingBottom: "0.4375rem",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem"
            }}>
              <Badge
                overlap='circular'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                {
                  userImage
                    ? (<Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />)
                    : (<Box
                      sx={{
                        background: HSLtoString(generateHSL('Yaroslav Pashinskiy')),
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px',
                        lineHeight: '1'
                      }}
                    >
                      Y
                    </Box>)
                }

              </Badge>

              <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 500 }}>John Doe</Typography>
                {/* <Typography variant='body2'>Admin</Typography> */}
              </Box>
            </Box>
            <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />

            <List sx={{ padding: 0 }}>
              <ListItem onClick={() => handleRoute('/profile/account')} sx={{ py: 0, ':hover': { backgroundColor: 'rgba(115, 103, 240, 0.08)', color: "#7367F0" } }} >
                <Box sx={styles}>
                  <Icon fontSize='1.25rem' icon='tabler:users' />
                  Account
                </Box>
              </ListItem>
              <ListItem onClick={() => handleRoute('/profile/change_password')} sx={{ py: 0, ':hover': { backgroundColor: 'rgba(115, 103, 240, 0.08)', color: "#7367F0" } }}>
                <Box sx={styles}>
                  <Icon icon='tabler:lock' />
                  Change password
                </Box>
              </ListItem>
            </List>
            <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
            <List sx={{ padding: 0 }}>
              <ListItem
                onClick={handleLogout}
                sx={{ py: 0, ':hover': { backgroundColor: 'rgba(115, 103, 240, 0.08)', color: "#7367F0" } }}>
                <Box sx={{ ...styles, }}>
                  <Icon icon='tabler:logout' />
                  Sign Out
                </Box>
              </ListItem>
            </List>
          </Box>
      </Badge>

    </Fragment>
  )
}

const hRange = [0, 360];
const sRange = [50, 75];
const lRange = [25, 60];

const generateHSL = (name) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);

  return [h, s, l];
};

const HSLtoString = (hsl) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

export default UserDropdown
