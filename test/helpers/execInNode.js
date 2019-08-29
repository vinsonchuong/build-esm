/* @flow */
import * as path from 'path'
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(filePath: string): Promise<string> {
  const { stdout } = await exec(`node ${path.resolve(filePath)}`)
  return stdout.trim()
}
