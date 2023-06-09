import * as yup from 'yup'

export const defaultGeneralValues = {
  name: '',
  description: '',
  rangeDate: '',
  eventEndSignIn: null,
  price: '',
  limitMembers: ''
}

export const generalSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  rangeDate: yup.array().required(),
  eventEndSignIn: yup.mixed().notRequired(),
  price: yup.string(),
  limitMembers: yup.string(),
})

export const defaultSpecificValues = {
  nameRequired: true,
  surnameRequired: true,
  emailRequired: false,
  telephoneRequired: false,
  numberInvites: false,
  numberPeople: false,
  numberTickets: false,
}

export const specificSchema = yup.object().shape({
  firstNameRequired: yup.boolean(),
  secondNameRequired: yup.boolean(),
  emailRequired: yup.boolean(),
  telephoneRequired: yup.boolean(),
  numberInvites: yup.boolean(),
  numberTickets: yup.boolean(),
  numberPeople: yup.boolean(),
})

export const defaultSocialValues = {
  telegramRequired: false,
  viberRequired: false,
  whatsappRequired: false,
  instagramRequired: false,
  facebookRequired: false,
  twitterRequired: false,
}

export const socialSchema = yup.object().shape({
  telegramRequired: yup.boolean(),
  viberRequired: yup.boolean(),
  whatsappRequired: yup.boolean(),
  instagramRequired: yup.boolean(),
  facebookRequired: yup.boolean(),
  twitterRequired: yup.boolean(),
})