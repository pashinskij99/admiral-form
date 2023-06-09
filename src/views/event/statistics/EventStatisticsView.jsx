// ** React Imports
import {forwardRef} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import styled from '@emotion/styled'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import {formatDate} from "../../../@core/utils/formatDate";
import {Tooltip} from "@mui/material";
import Icon from "../../../@core/components/icon";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CustomInput = forwardRef(({...props}, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{width: '100%'}}/>
})

const StatisticsForm = ({eventData}) => {

  const {name, eventStart, id} = eventData

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/event/${id}`)
      .then(() => {
        toast.success('The link is copied', {
          position: 'bottom-right'
        })
      })
      .catch((e) => {
        console.log(e.message)
        toast.error('The link is not copied', {
          position: 'bottom-right'
        })
      })
  }

  return (
    <Card>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <CardHeader title='Statistics'/>
        <Box
          sx={{marginRight: '1.5rem'}}
        >
          <Tooltip title="Edit" placement="top">
            <Link href={`/event/edit/${id}`}>
              <IconButton>
                <Icon icon='tabler:edit' style={{fontSize: '30px'}}/>
              </IconButton>
            </Link>
          </Tooltip>
        </Box>

      </Box>
      <CardContent>
        <Grid container spacing={5}>

          <Grid item xs={12}>
            <Typography
              fontSize={'0.8125rem'}
            >Name</Typography>
            <Typography
              fontSize={'0.7125rem'}
              sx={{opacity: '0.6'}}
            >Name of the event</Typography>
            <CustomTextField
              fullWidth
              value={name}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              fontSize={'0.8125rem'}
            >Date</Typography>
            <Typography
              fontSize={'0.7125rem'}
              sx={{opacity: '0.6'}}
            >Date taking place</Typography>
            <CustomInput
              value={formatDate(new Date(eventStart))}
            />
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography
                fontSize={'0.8125rem'}
              >Link</Typography>
              <Typography
                fontSize={'0.7125rem'}
                sx={{opacity: '0.6'}}
              >Link associated with the event form. You can be copied by just clicking/tapping</Typography>
              <Box position='relative'>
                <CustomTextField
                  fullWidth
                  value={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/event/${id}`}
                />
                <Link
                  href={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/event/${id}`}
                  target='_blank'
                >
                  <Tooltip title="Event Page" placement="top">

                    <StyledIconButton
                      sx={{position: 'absolute', right: 42, top: 0, color: 'rgba(47, 43, 61, 0.7)'}}
                    >
                      <Icon icon='majesticons:open'/>
                    </StyledIconButton>
                  </Tooltip>
                </Link>

                <Tooltip title="Copy" placement="top">
                  <StyledIconButton
                    onClick={handleCopy}
                    sx={{position: 'absolute', right: 7, top: 0, color: 'rgba(47, 43, 61, 0.7)'}}
                  >
                    <Icon icon='octicon:copy-16'/>
                  </StyledIconButton>
                </Tooltip>
              </Box>

            </Box>

          </Grid>

          <Grid item xs={12}>
            <Typography
              fontSize={'0.8125rem'}
            >Money</Typography>
            <Typography
              fontSize={'0.7125rem'}
              sx={{opacity: '0.6'}}
            >Money generated from the event – If money generated is 0 it is not shown</Typography>
            <CustomInput
              value={0}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const StyledIconButton = styled(IconButton)`
  &:hover {
    background-color: transparent
  }
`

export default StatisticsForm

