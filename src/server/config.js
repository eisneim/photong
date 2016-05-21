import path from 'path'

export default function setConfig(app) {
  var config = {
    rootPath: path.resolve(__dirname + '/../../'),
    env: app.env,
  }

  return config
}