import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { loginSuccess } from '../redux/auth/actions'
import { AppState } from '../redux/store'

type FormData = {
  firstName: string
  lastName: string
  email: string
}

const schema = yup
  .object({
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(5).required(),
    email: yup.string().email().required(),
  })
  .required()

function Profile() {
  const dispatch = useDispatch()
  const userData = useSelector((state: AppState) => state.auth.user)
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: userData?.firstName ?? '',
      lastName: userData?.lastName ?? '',
      email: userData?.email ?? '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user/profile')
        dispatch(loginSuccess(response.data))
        reset(response.data)
      } catch (error) {
        // dispatch action that handle error
      }
    }

    fetchProfile()
  }, [dispatch, reset])

  const onSubmit = async (data: FormData) => {
    const response = await axios.put('/user', data)
    if (response.status === 200) {
      alert('updated')
    }
  }

  return (
    <div>
      <h1>Profile page</h1>
      <p>Private information</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors?.firstName)}
                helperText={errors?.firstName?.message}
              />
            )}
          />
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors?.lastName)}
                helperText={errors?.lastName?.message}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            )}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default Profile
