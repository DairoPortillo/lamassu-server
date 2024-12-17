import * as Yup from 'yup'

import {
  TextInput,
  SecretInput,
  Autocomplete
} from 'src/components/inputs/formik'

import { secretTest } from './helper'

const isDefined = it => it && it.length

const buildTestValidation = (id, passphrase) => {
  return Yup.string()
    .max(100, 'Too long')
    .when(id, {
      is: isDefined,
      then: schema => schema.test(secretTest(passphrase))
    })
}

export default {
  code: 'cuculabs',
  name: 'Cuculabs',
  title: 'Cuculabs (Wallet)',
  elements: [
    {
      code: 'token',
      display: 'API key token',
      component: TextInput,
      face: true,
      long: true
    },
    {
      code: 'WLDWalletId',
      display: 'WLD wallet ID',
      component: TextInput
    },
  ],
  getValidationSchema: account => {
    return Yup.object().shape({
      token: Yup.string('The token must be a string')
        .max(100, 'The token is too long')
        .required('The token is required'),
      WLDWalletId: Yup.string('The WLD wallet ID must be a string').max(
        150,
        'The BTC wallet ID is too long'
      ),
    })
  }
}
