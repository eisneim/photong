/* eslint-disable no-console */
import easyimg from 'easyimage'
import path from 'path'

var ExifImage = require('exif').ExifImage

/*   the file object:
"fieldname": "resources",
"originalname": "Sadik Hadzovic_902627683186764_322238662_n.jpg",
"encoding": "7bit",
"mimetype": "image/jpeg",
"destination": "/Users/eisneim/www/my_project/photong/uploads/2016-05",
"filename": "xx.jpg",
"path": "/Users/eisneim/www/my_project/photong/uploads/2016-05/xx.jpg",
 */
/* eslint-disable no-new */
export function getExif(imagePath) {
  return new Promise((resolve) => {
    try {
      new ExifImage({ image: imagePath }, (error, exifData) => {
        if (error) return resolve({})
        resolve(exifData)
      })
    } catch (e) {
      resolve({})
    }
  })
}
// resize an image and create a thumbnail
//check if image is not too big, if so, not resize it
export function resizeAndThumb(imgPath, resPath, thumbPath, maxWidth, maxHeight, toWidth) {
  const replaceOriginal = imgPath === resPath
  try {
    return easyimg.info(imgPath)
    .then(img => {
      // resizeWidth,  resizeCoropWidth
      var rw, rh, rcw, rch
      if (img.height === 0) return reject('image height can not be 0')
      var ratio = img.width / img.height
      // for resizeCrop:
      if (ratio < 1) {
        rcw = toWidth
        rch = ratio / rcw
      } else {
        rch = toWidth
        rcw = ratio * rch
      }

      // for resize
      if (maxWidth && maxHeight) {
        if (ratio < 1) { //to a very tall image
          rh = img.height > maxHeight ? maxHeight : img.height
          rw = rh * ratio
        } else { // to a very wide image or squre image
          rw = img.width > maxWidth ? maxWidth : img.width
          rh = rw / ratio
        }
      } else if (maxWidth) { // 只考虑宽，不管有多高。
        rw = img.width > maxWidth ? maxWidth : img.width
        rh = rw / ratio
      } else {
        rh = img.height > maxHeight ? maxHeight : img.height
        rw = rh * ratio
      }
      // // if format is gif, use gifsicle
      // if (/gif|GIF/.test(img.type)) {
      //   return new Promise((resolve, reject)=>{
      //     execFile(gifsicle, [ '--resize-width', 150, '-o', resPath, imgPath ],
      //     function(err) {
      //       if (err) return reject(err)
      //       resolve(img)
      //     })
      //   })
      // }

      function returnImgInfo() {
        // return back the image info;
        img.resizedWidth = rw
        img.resizedHeight = rh
        return img
      }

      // no need to do resize, resolve the crop promise directly
      if (rw === img.width && rh === img.height && replaceOriginal) {
        return easyimg.rescrop({ // do the create thumbnail now without resize;
          src: imgPath, dst: thumbPath,
          width: rw, height: rh,
          cropwidth: toWidth,
          cropheight: toWidth,
          gravity: 'center',
          quality: 80,
        }).then(returnImgInfo)
      }

      return easyimg.resize({
        src: imgPath, dst: resPath,
        width: rw, height: rh,
      }).then(() => {
        // do the croping
        return easyimg.rescrop({ // do the crop now without resize
          src: imgPath, dst: thumbPath,
          width: rcw, height: rch,
          cropwidth: toWidth,
          gravity: 'center',
          quality: 80,
        }).then(returnImgInfo)
      })
    })

  } catch (e) { console.error(e) }
}

export function batchParse(files = []) {
  const promises = files.map(file => {
    const extname = path.extname(file.path)
    const basename = path.basename(file.path, extname)
    const random = Math.floor(Math.random() * 100)
    file.resPath = path.dirname(file.path) + '/' + basename + random + '_res' + extname
    file.thumbPath = path.dirname(file.path) + '/' + basename + random + '_thumb' + extname

    return resizeAndThumb(file.path, file.resPath, file.thumbPath, 1440, 2000, 200)
  })

  return Promise.all(promises)
}

export function batchGetExif(files = []) {
  const promises = files.map(file => getExif(file.path))
  return Promise.all(promises)
}
