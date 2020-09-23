"use strict"

module.exports = (appInfo) => {
  const config = {}

  config.keys = `${appInfo.name}_1545100143003_9479`

  config.middleware = []

  config.security = {
    csrf: {
      cookieName: "_csrf_token",
    },
  }

  return config
}
