import styled from '@emotion/styled'
import { Icon } from '@iconify/react'
import { Box, Button, Card, CardContent, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'
import { adminUserIdFake } from 'src/config/adminUserIdFake'

// import Session from 'supertokens-node/recipe/session'
// import supertokensNode from 'supertokens-node'
// import { backendConfig } from "src/config/backendConfig"
import { instanceAxios } from 'src/config/instanceAxios'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'

export const getServerSideProps = async ctx => {
  // supertokensNode.init(backendConfig())

  // let session

  // try {
  //     session = await Session.getSession(ctx.req, ctx.res, {
  //     overrideGlobalClaimValidators: () => {
  //       return []
  //     }})
  // } catch (err) {
  //     if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
  //         return { props: { fromSupertokens: 'needs-refresh' } }
  //     } else if (err.type === Session.Error.UNAUTHORISED) {
  //         return { props: { fromSupertokens: 'needs-refresh' } }
  //     }

  //     throw err
  // }

  return {
    props: {
      userId: adminUserIdFake

      // userId: session.getUserId()
    }
  }
}

const EventLinkPage = ({ userId }) => {
  const [createdEventId, setCreatedEventId] = useState('')
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  useEffect(() => {
    const newEvent = localStorage.getItem('newEvent')

    const createNewEvent = async () => {
      setLoading(true)
      await instanceAxios
        .post(`/users/${userId}/events`, JSON.parse(newEvent))
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
        .then(res => {
          toast.success('Congratulations, you have successfully created an event!')
          setCreatedEventId(res.data.id)
          localStorage.setItem('lastEventId', res.data.id)
        })
        .finally(() => {
          localStorage.removeItem('newEvent')
          setLoading(false)
        })
    }

    if (newEvent) {
      createNewEvent()
    }
  }, [userId])

  const linkInputValue = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/event/${
    createdEventId || localStorage.getItem('lastEventId')
  }`

  const handleCopy = () => {
    navigator.clipboard
      .writeText(linkInputValue)
      .then(() => {
        toast.success('The link is copied', {
          position: 'bottom-right'
        })
      })
      .catch(e => {
        console.log(e.message)
        toast.error('The link is not copied', {
          position: 'bottom-right'
        })
      })
  }

  const handleNext = () => {
    push(`/event/statistics/${createdEventId}`)
  }

  return (
    <SessionAuth>
      <Box display={'flex'} alignItems={'center'} height={'100%'}>
        <Card style={{ height: 'auto', width: '100%' }}>
          <CardContent>
            <Fragment>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'start' }
                }}
              >
                All steps are completed!
                <br />
                We have generated a link to your event that you can share.
              </Typography>

              {loading ? (
                <LinearProgress sx={{ mt: 4 }} />
              ) : (
                <Box sx={{ mt: 4 }} position={'relative'}>
                  <StyledInputLink fullWidth value={linkInputValue} disabled />
                  <Link target='_blank' href={`/event/${createdEventId}`}>
                    <Tooltip title='Event' placement='top'>
                      <StyledIconButton
                        sx={{ position: 'absolute', right: 35, top: 0, color: 'rgba(47, 43, 61, 0.7)' }}
                      >
                        <Icon icon='majesticons:open' />
                      </StyledIconButton>
                    </Tooltip>
                  </Link>

                  <Tooltip title='Copy' placement='top'>
                    <StyledIconButton
                      onClick={handleCopy}
                      sx={{ position: 'absolute', right: 2, top: 0, color: 'rgba(47, 43, 61, 0.7)' }}
                    >
                      <Icon icon='octicon:copy-16' />
                    </StyledIconButton>
                  </Tooltip>
                </Box>
              )}

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                <Button variant='contained' onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Fragment>
          </CardContent>
        </Card>
      </Box>
    </SessionAuth>
  )
}

const StyledInputLink = styled(CustomTextField)`
  input:disabled {
    -webkit-text-fill-color: rgba(47, 43, 61, 0.7);
  }
  input {
    padding: 7.5px 75px 7.5px 13px !important;
  }
`

const StyledIconButton = styled(IconButton)`
  &:hover {
    background-color: transparent;
  }
`

export default EventLinkPage
