/* @flow */
import * as path from 'path'
import { promisify } from 'util'
import mkdirp from 'mkdirp'

export default async function(directoryPath: string): Promise<void> {
  await promisify(mkdirp)(path.resolve(directoryPath))
}
