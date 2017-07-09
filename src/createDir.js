/* @flow */
import * as path from 'path'
import thenify from 'thenify'
import mkdirp from 'mkdirp'

export default async function(directoryPath: string): Promise<void> {
  await thenify(mkdirp)(path.resolve(directoryPath))
}
