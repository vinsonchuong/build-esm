import * as path from 'path'
import {exec} from 'mz/child_process'

export default async function (binName, workingDirectory) {
  return await exec(
    `babel-node ${path.resolve('src/bin', binName)}`,
    {
      cwd: path.resolve(workingDirectory)
    }
  )
}
