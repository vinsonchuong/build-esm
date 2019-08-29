/* @flow */
import * as path from 'path'
import { promises as fs } from 'fs'

export default function(filePath: string): Promise<string> {
  return fs.readFile(path.resolve(filePath), 'utf8')
}
