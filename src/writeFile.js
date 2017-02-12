/* @flow */
import * as path from 'path'
import * as fs from 'mz/fs'
import createDir from './createDir'

export default async function (
  destinationPath: string,
  contents: string
): Promise<void> {
  await createDir(path.dirname(destinationPath))
  await fs.writeFile(destinationPath, contents)
}

