const { environment } = require('@rails/webpacker')

const path = require('path')

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
      '@img': path.resolve(__dirname, '..', '..', 'app/assets/images'),
      '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
      '@shared': path.resolve(__dirname, '..', '..', 'app/javascript/src/shared')
    }
  }
}

environment.config.merge(customConfig);

environment.splitChunks()

const webpack = require('webpack')
const dotenv = require('dotenv')

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env'
]

dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({
    path: dotenvFile,
    silent: true
  })
})

environment.plugins.insert("Environment", new webpack.EnvironmentPlugin(process.env))

module.exports = environment
