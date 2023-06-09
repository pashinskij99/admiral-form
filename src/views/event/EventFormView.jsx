// ** React Imports
import {forwardRef, useState} from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import {useForm, Controller} from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {instanceAxios} from 'src/config/instanceAxios'

const defaultValues = {
  name: '',
  surname: '',
  email: '',
  telephone: '',
  facebook: '',
  instagram: '',
  twitter: '',
  telegram: '',
  viber: '',
  whatsapp: ''
}

const EventFormView = ({eventId, inputRequired}) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({defaultValues})

  const onSubmit = (data) => {
    instanceAxios.post(`/events/${eventId}/members`, data)
      .then((res) => {
        console.log(res)
        toast.success('Form Submitted')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Form is not submitted')
      })

  }

  return (
    <Card id={'sign-in'}>
      <CardHeader
        title='User signing up for the event'
        subheader=''
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name='name'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Name'
                    onChange={onChange}
                    placeholder='Name'
                    error={Boolean(errors.name)}
                    {...(errors.name && {helperText: 'This field is required'})}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='surname'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Surname'
                    onChange={onChange}
                    placeholder='Surname'
                    error={Boolean(errors.surname)}
                    {...(errors.surname && {helperText: 'This field is required'})}
                  />
                )}
              />
            </Grid>

            {
              inputRequired.map(({
                                   id, name, type, label, placeholder
                                 }) => (
                <Grid key={id} item xs={12}>
                  <Controller
                    name={name}
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <CustomTextField
                        fullWidth
                        type={type}
                        value={value}
                        label={label}
                        onChange={onChange}
                        placeholder={placeholder}
                      />
                    )}
                  />
                </Grid>
              ))
            }

            <Grid item xs={12} textAlign={'right'}>
              <Button type='submit' variant='contained'>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EventFormView
