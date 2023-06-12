// ** Demo Components Imports
import ProfileView from 'src/views/profile/ProfileView'

const AccountSettingsTab = ({ tab }) => {
  return <ProfileView tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'change_password' } },
      { params: { tab: 'payment' } },
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  // const res = await axios.get('/pages/pricing')
  // const data = res.data

  return {
    props: {
      tab: params?.tab,

      // apiPricingPlanData: data.pricingPlans
    }
  }
}

export default AccountSettingsTab
