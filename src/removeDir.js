/* @flow */
import * as path from 'path'
import rimraf from 'rimraf'
import { promisify } from 'util'

export default async function(directoryPath: string): Promise<void> {
  await promisify(rimraf)(path.resolve(directoryPath))
}
