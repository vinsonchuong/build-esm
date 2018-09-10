#!/usr/bin/env node
/* @flow */
import * as path from 'path'
import { promisify } from 'util'
import * as babel from '@babel/core'
import babelConfig from 'overdub/babel'
import packageList from 'npm-packlist'
import createDir from '../createDir'
import removeDir from '../removeDir'
import readFile from '../readFile'
import writeFile from '../writeFile'
import copyFile from '../copyFile'

function currentScript(): ?string {
  return process.env.npm_lifecycle_event
}

async function compileFile(filePath: string): Promise<string> {
  const { code } = await promisify(babel.transformFile)(filePath, babelConfig)
  return code
}

async function run(): Promise<void> {
  const packageJson = JSON.parse(await readFile(path.resolve('package.json')))
  const usesFlow = 'flow-bin' in packageJson.devDependencies

  if (currentScript() === 'prepack') {
    for (const filePath of await packageList()) {
      if (filePath.endsWith('.js')) {
        console.log(`Compiling ${filePath}`)

        if (usesFlow) {
          const contents = await readFile(filePath)
          await writeFile(`${filePath}.flow`, contents)
        }

        const compiledContents = await compileFile(filePath)
        await writeFile(filePath, compiledContents)
      }
    }
  } else {
    const distPath = process.argv[2] || 'dist'

    await removeDir(distPath)
    await createDir(distPath)
    for (const filePath of await packageList()) {
      if (filePath.endsWith('.js')) {
        console.log(`Compiling ${filePath} => ${distPath}/${filePath}`)

        if (usesFlow) {
          const contents = await readFile(filePath)
          await writeFile(path.join(distPath, `${filePath}.flow`), contents)
        }

        const compiledContents = await compileFile(filePath)
        await writeFile(path.join(distPath, filePath), compiledContents)
      } else {
        console.log(`Copying ${filePath} => ${distPath}/${filePath}`)
        await copyFile(path.resolve(filePath), path.join(distPath, filePath))
      }
    }
  }
}

run()
