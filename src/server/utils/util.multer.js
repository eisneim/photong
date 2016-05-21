import multer from 'koa-multer'
import { yyyymm } from '../../_shared/utils/util.dateTime.js'
import fs from 'fs'

export default function createMiddeware(app) {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const folderName = yyyymm()
      const fullPath = app.config.rootPath + '/uploads/' + folderName
      if (!fs.existsSync(fullPath))
        fs.mkdirSync(fullPath)

      cb(null, fullPath)
    },
    filename(req, file, cb) {
      /*
      { fieldname: 'resources',
        originalname: 'Sadik Hadzovic_902627683186764_322238662_n.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg' }
       */
      // const date = new Date()
      // const datestring = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getMilliseconds() ].join('-')
      // normalize the filename, replace chinese character
      const newFilename = Date.now() + '_' + file.originalname
        .replace(/[^\u4e00-\u9fa5\w\.\-]/g, '_')

      cb(null, newFilename)
    },
  })

  return multer({ dest: app.config.rootPath + '/uploads', storage })
}