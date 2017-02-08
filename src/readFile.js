import * as path from 'path'
import * as fs from 'mz/fs'

export default async function (filePath) {
  return await fs.readFile(path.resolve(filePath), 'utf8')
}
