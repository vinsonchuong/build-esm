/* @flow */
import * as path from 'path'
import { exec } from 'mz/child_process'

export default function(
  binName: string,
  workingDirectory: string
): Promise<string> {
  return exec(`node -r babel-register ${path.resolve('src/bin', binName)}`, {
    cwd: path.resolve(workingDirectory)
  })
}
