/* @flow */
import * as path from 'path'
import * as fs from 'mz/fs'
import createDir from './createDir'

export default async function(
  sourcePath: string,
  destinationPath: string
): Promise<void> {
  await createDir(path.dirname(destinationPath))
  await fs.copyFile(sourcePath, destinationPath)
}
