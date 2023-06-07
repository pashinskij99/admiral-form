// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },

  env: {
    NEXT_PUBLIC_JWT_EXPIRATION: "5m",
    NEXT_PUBLIC_JWT_SECRET: "dd5f3089-40c3-403d-af14-d0c228b05cb4",
    NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET: "7c4c1c50-3230-45bf-9eae-c9b2e401c767",
    APP_NAME: "event-dashboard",
    API_DOMAIN: "http://localhost:3000",
    WEBSITE_DOMAIN: "http://localhost:3000",
    API_BASE_PATH: "/api/auth",
    WEBSITE_BASE_PATH: "/auth",
  }
}
