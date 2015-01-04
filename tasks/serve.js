import {build} from 'metalsmith-bundle'
import {debug} from '../utils'

const log = debug('metalsmith:serve')

export default function (config) {
  build(config, (error, success) => {
    if (error) {
      log(error)
      return
    }

    log(success)
  })
}
