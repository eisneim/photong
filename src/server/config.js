import path from 'path'
import cfg from '../../_config'

export default function setConfig(app) {
  var config = {
    rootPath: path.resolve(__dirname + '/../../'),
    env: app.env,
  }

  return Object.assign(config, cfg)
}