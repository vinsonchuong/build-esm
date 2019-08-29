/* @flow */
import * as path from 'path'
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(
  binName: string,
  workingDirectory: string
): Promise<string> {
  await exec('yarn build')
  return exec(`node ${path.resolve('dist/src/bin', binName)}`, {
    cwd: path.resolve(workingDirectory)
  })
}
