import useAxios from '@use-hooks/axios'
import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search)

const AuthRegister = () => {
  const history = useHistory()
  const query = useQuery()

  useAxios({
    url: `/api/register?otp=${query.get('otp')}`,
    method: 'GET',
    options: {
      withCredentials: true
    },
    trigger: [],
    customHandler: (err, res) => {
      if (err) return
      if (res) {
        history.push('/wizard', { fromAuthRegister: true })
      }
    }
  })

  return <span>registering...</span>
}

export default AuthRegister
