import * as yup from 'yup'

export const getDefaultValues = ({currentFormInfo}) => {
  const defaultGeneralValues = {
    ...currentFormInfo,
    eventEndSignIn: new Date(currentFormInfo.eventEndSignIn),
    price: currentFormInfo.price || 0,
    limitMembers: currentFormInfo.limitMembers || 0
  }

  const defaultSpecificValues = {
    nameRequired: true,
    surnameRequired: true,
    emailRequired: currentFormInfo.emailRequired,
    telephoneRequired: currentFormInfo.telephoneRequired,
    numberInvites: false,
    numberPeople: false,
    numberTickets: false,
  }

  const defaultSocialValues = {
    telegramRequired: currentFormInfo.telegramRequired,
    viberRequired: currentFormInfo.viberRequired,
    whatsappRequired: currentFormInfo.whatsappRequired,
    instagramRequired: currentFormInfo.instagramRequired,
    facebookRequired: currentFormInfo.facebookRequired,
    twitterRequired: currentFormInfo.twitterRequired,
  }

  return {
    defaultGeneralValues,
    defaultSpecificValues,
    defaultSocialValues
  }
}

export const generalSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  price: yup.string(),
  limitMembers: yup.string(),
})

export const specificSchema = yup.object().shape({
  nameRequired: yup.boolean(),
  surnameRequired: yup.boolean(),
  emailRequired: yup.boolean(),
  telephoneRequired: yup.boolean(),
  numberInvites: yup.boolean(),
  numberTickets: yup.boolean(),
  numberPeople: yup.boolean(),
})

export const socialSchema = yup.object().shape({
  telegramRequired: yup.boolean(),
  viberRequired: yup.boolean(),
  whatsappRequired: yup.boolean(),
  instagramRequired: yup.boolean(),
  facebookRequired: yup.boolean(),
  twitterRequired: yup.boolean(),
})