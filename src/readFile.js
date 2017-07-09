/* @flow */
import * as path from 'path'
import * as fs from 'mz/fs'

export default function(filePath: string): Promise<string> {
  return fs.readFile(path.resolve(filePath), 'utf8')
}
