#!/usr/bin/env node
/* @flow */
import * as path from 'path'
import thenify from 'thenify'
import * as babel from 'babel-core'
import packageList from 'npm-packlist'
import createDir from '../createDir'
import removeDir from '../removeDir'
import readFile from '../readFile'
import writeFile from '../writeFile'

function currentScript(): ?string {
  return process.env.npm_lifecycle_event
}

async function compileFile(filePath: string): Promise<string> {
  const { code } = await thenify(babel.transformFile)(filePath, {
    sourceMaps: 'inline'
  })
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
    await removeDir('dist')
    await createDir('dist')
    for (const filePath of await packageList()) {
      if (filePath.endsWith('.js')) {
        console.log(`Compiling ${filePath} => dist/${filePath}`)

        if (usesFlow) {
          const contents = await readFile(filePath)
          await writeFile(path.join('dist', `${filePath}.flow`), contents)
        }

        const compiledContents = await compileFile(filePath)
        await writeFile(path.join('dist', filePath), compiledContents)
      } else {
        console.log(`Copying ${filePath} => dist/${filePath}`)
        const contents = await readFile(filePath)
        await writeFile(path.join('dist', filePath), contents)
      }
    }
  }
}

run()
