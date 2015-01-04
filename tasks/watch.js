import {build} from 'metalsmith-bundle'
import {debug} from '../utils'

const log = debug('metalsmith:watch')

export default function (config) {
  build(config, (error, success) => {
    if (error) {
      log(error)
      return
    }

    log(success)
  })
}
