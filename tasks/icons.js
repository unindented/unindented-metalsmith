import {spawn} from 'child_process'
import {resolve} from 'path'
import {parallel, series} from 'async'
import {debug, isArray, map, reduce} from '../utils'

const log = debug('metalsmith:icons')

const exec = (command, callback) => {
  log(command)

  const child = spawn('/bin/sh', ['-c', command], {stdio: 'inherit'})

  child.on('close', (code) => {
    if (code !== 0) {
      return callback(code)
    }

    callback()
  })
}

const copy = (src, dst, callback) => {
  exec(`cp ${src} ${dst}`, callback)
}

const convertWithImageMagick = (png, ico, size, callback) => {
  png = resolve(png)
  ico = resolve(ico)

  let options = ''

  if (isArray(size)) {
    options += reduce(size, (memo, size) => {
      return `${memo} \\( -clone 0 -resize ${size} \\)`
    }, '')
    options += ' -delete 0'
  } else {
    options += ` -resize ${size}`
  }

  const command = `convert ${png} ${options} ${ico}`
  exec(command, callback)
}

const convertWithInkscape = (svg, png, size, callback) => {
  svg = resolve(svg)
  png = resolve(png)

  const options = `--without-gui --export-width ${size} --export-height ${size}`

  const command = `inkscape ${options} --export-png ${png} ${svg}`
  exec(command, callback)
}

const generateImage = (src, dst, sizes, generator, callback) => {
  const tasks = map(sizes, (size, key) => {
    return (callback) => {
      const kdst = dst.replace(/(\.[^.]+)$/, key ? `-${key}$1` : '$1')
      generator(src, kdst, size, callback)
    }
  })

  parallel(tasks, callback)
}

const generateIco = (png, ico, sizes, callback) => {
  generateImage(png, ico, sizes, convertWithImageMagick, callback)
}

const generatePng = (svg, png, sizes, callback) => {
  generateImage(svg, png, sizes, convertWithInkscape, callback)
}

const tasks = [
  (callback) => {
    const src = './source/assets/images/logo_stroked.svg'
    const dst = './source/favicon.svg'

    log('generating favicon in SVG format...')
    copy(src, dst, callback)
  },

  (callback) => {
    const src = './source/favicon.svg'
    const dst = './source/favicon.png'
    const sizes = {
      '48x48': 48,
      '32x32': 32,
      '24x24': 24,
      '16x16': 16,
      '': 32
    }

    log('generating favicon in PNG format...')
    generatePng(src, dst, sizes, callback)
  },

  (callback) => {
    const src = './source/favicon-48x48.png'
    const dst = './source/favicon.ico'
    const sizes = {
      '': [48, 32, 24, 16]
    }

    log('generating favicon in ICO format...')
    generateIco(src, dst, sizes, callback)
  },

  (callback) => {
    const src = './source/favicon.svg'
    const dst = './source/apple-touch-icon.png'
    const sizes = {
      '144x144-precomposed': 144,
      '120x120-precomposed': 120,
      '114x114-precomposed': 114,
      '72x72-precomposed': 72,
      '57x57-precomposed': 57,
      'precomposed': 57,
      '': 57
    }

    log('generating Apple icons in PNG format...')
    generatePng(src, dst, sizes, callback)
  },

  (callback) => {
    const src = './source/favicon.svg'
    const dst = './source/ms-touch-icon.png'
    const sizes = {
      '558x558': 558,
      '270x270': 270,
      '128x128': 128
    }

    log('generating Microsoft icons in PNG format...')
    generatePng(src, dst, sizes, callback)
  }

]

export default function () {
  series(tasks, (err) => {
    if (err) {
      return log(err)
    }

    log('successfully generated')
  })
}
