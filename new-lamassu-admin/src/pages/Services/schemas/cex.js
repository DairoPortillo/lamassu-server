import * as Yup from 'yup'

import SecretInputFormik from 'src/components/inputs/formik/SecretInput'
import TextInputFormik from 'src/components/inputs/formik/TextInput'

import { secretTest } from './helper'

export default {
  code: 'cex',
  name: 'CEX.IO',
  title: 'CEX.IO (Exchange)',
  elements: [
    {
      code: 'apiKey',
      display: 'API key',
      component: TextInputFormik,
      face: true,
      long: true
    },
    {
      code: 'uid',
      display: 'User ID',
      component: TextInputFormik,
      face: true,
      long: true
    },
    {
      code: 'privateKey',
      display: 'Private key',
      component: SecretInputFormik
    }
  ],
  getValidationSchema: account => {
    return Yup.object().shape({
      apiKey: Yup.string('The API key must be a string')
        .max(100, 'The API key is too long')
        .required('The API key is required'),
      uid: Yup.string('The User ID must be a string')
        .max(100, 'The User ID is too long')
        .required('The User ID is required'),
      privateKey: Yup.string('The private key must be a string')
        .max(100, 'The private key is too long')
        .test(secretTest(account?.privateKey, 'private key'))
    })
  }
}
