import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import Router from 'next/router'
import { useAuthSuperToken } from 'src/hooks/useAuth'
import axios from 'axios'

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        getRedirectionURL: async (context) => {
          if (context.action === "SUCCESS") {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return context.redirectToPath;
            }
            const newEvent = localStorage.getItem('newEvent')
            if(newEvent) {
              return "/event/link"
            }
          }

          return undefined
        },
        useShadowDom: false,
        style: `
          [data-supertokens~="row"] {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            margin: 0 auto;
          }
          [data-supertokens~="row"]:last-child svg * {
            stroke: #7367F0;
            // background: #000;
            // fill: #000;
          }
          form {
            width: 100%;
          }
          [data-supertokens~="headerTitle"] {
            width: 100%;
          }
          [data-supertokens~="headerSubtitle"] {
            width: 100%;
          }
          [data-supertokens~="divider"] {
            width: 100%;
          }
          [data-supertokens~="input"] {
            background-color: white;
            font-size: 12px;
            letter-spacing: 0.4px;
            font-weight: 300;
            padding: 7.5px 13px;
            color: rgba(47, 43, 61, 0.68);
            font-size: 0.9375rem;
            transition: all 0.3s ease;
          }
          [data-supertokens~="inputWrapper"]:focus-within {
            border: none;
            box-shadow: none;

          }
          [data-supertokens~="input"]:focus-within {
            box-shadow: 0 0 0 0.1rem #7367F0;
          }
          [data-supertokens~="thirdPartyEmailPasswordDivider"] {
            width: 100%;
          }
          [data-supertokens~="providerContainer"] {
            order: 3;
            display: flex;
          }
          [data-supertokens~="providerButtonText"] {
            display: none
          }
          [data-supertokens~="providerButtonLeft"] {
            margin: 0!important
          }
          [data-supertokens~="thirdPartyEmailPasswordDivider"] {
            order: 2
          }
          [data-supertokens~="formRow"] {
            padding-bottom: 15px
          }
          [data-supertokens~="formRow"]:last-child {
            padding-bottom: 0px
          }
          [data-supertokens~="formRow"]:nth-child(1) {
            grid-area: google;
          }
          [data-supertokens~="formRow"]:nth-child(2) button {
            grid-area: facebook;
            background-color: #7367F0;
            border: none;
            padding: 10px 20px;
          }
          [data-supertokens~="formRow"]:nth-child(3) button {
            background-color: #7367F0;
            border: none;
            padding: 10px 20px;
          }
          [data-supertokens~="formRow"]:nth-child(4) {

          }
          [data-supertokens~="container"] {
            background: transparent;
            box-shadow: none;
            font-family: unset;
            font-weight: 500;
          }
          [data-supertokens~="button"]:first-child {
            // background-color: #7367F0;
          }
          [data-supertokens~="superTokensBranding"] {
            display: none
          }
        `,
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Google.init(),
            ThirdPartyEmailPasswordReact.Facebook.init(),
            ThirdPartyEmailPasswordReact.Github.init(),
            ThirdPartyEmailPasswordReact.Apple.init(),
          ],
        },

        // onHandleEvent: (context) => {
        //   // console.log({context});
        //   if (context.action === 'SUCCESS') {
        //     const newEvent = localStorage.getItem('newEvent')
        //     if (newEvent) {
        //       try {
        //         instanceAxios.post(`/users/${context.user.id}/events`,
        //           JSON.parse(newEvent)
        //         )
        //           .catch((error) => {
        //             if (error.response) {
        //               console.log(error.response.data);
        //               console.log(error.response.status);
        //               console.log(error.response.headers);
        //             } else if (error.request) {
        //               console.log(error.request)
        //             } else {
        //               console.log('Error', error.message);
        //             }
        //             console.log(error.config);
        //           })
        //           .then((res) => {
        //             toast.success('Event created!')
        //             console.log(res)
        //           }).finally(() => {
        //             localStorage.removeItem('newEvent')
        //             Router.push(`event/link/${res.data.id}`)
        //           })
        //       } catch (error) {

        //       }
        //     }
        //   }
        // }
      }),
      SessionReact.init(),
    ],
    windowHandler: (oI) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href) => {
            Router.push(href)
          },
        },
      }
    },
  }
}
