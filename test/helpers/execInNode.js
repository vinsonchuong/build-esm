/* @flow */
import * as path from 'path'
import { exec } from 'mz/child_process'

export default async function(filePath: string): Promise<string> {
  const [stdout] = await exec(`node ${path.resolve(filePath)}`)
  return stdout.trim()
}
