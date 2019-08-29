/* @flow */
import * as path from 'path'
import { promises as fs } from 'fs'
import createDir from './createDir'

export default async function(
  sourcePath: string,
  destinationPath: string
): Promise<void> {
  await createDir(path.dirname(destinationPath))
  await fs.copyFile(sourcePath, destinationPath)
}
