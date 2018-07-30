/* @flow */
import * as path from 'path'
import { exec } from 'mz/child_process'

export default async function(
  binName: string,
  workingDirectory: string
): Promise<string> {
  await exec('yarn build')
  return exec(`node ${path.resolve('dist/src/bin', binName)}`, {
    cwd: path.resolve(workingDirectory)
  })
}
