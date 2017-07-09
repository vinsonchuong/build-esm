/* @flow */
import * as path from 'path'
import rimraf from 'rimraf'
import thenify from 'thenify'

export default async function(directoryPath: string): Promise<void> {
  await thenify(rimraf)(path.resolve(directoryPath))
}
