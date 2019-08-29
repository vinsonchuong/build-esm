/* @flow */
import * as path from 'path'
import { promises as fs } from 'fs'
import createDir from './createDir'

export default async function(
  destinationPath: string,
  contents: string
): Promise<void> {
  await createDir(path.dirname(destinationPath))
  await fs.writeFile(destinationPath, contents)
}
