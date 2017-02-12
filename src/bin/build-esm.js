#!/usr/bin/env node

import * as path from 'path'
import thenify from 'thenify'
import * as babel from 'babel-core'
import pkgfiles from 'pkgfiles'
import createDir from '../createDir'
import removeDir from '../removeDir'
import readFile from '../readFile'
import writeFile from '../writeFile'

function currentScript () {
  return process.env.npm_lifecycle_event
}

async function packageFiles () {
  const [entries] = await thenify(pkgfiles)(process.cwd())
  return entries
    .filter(entry => !entry.isDirectory)
    .map(entry => entry.name)
}

async function compileFile (filePath) {
  const {code} = await thenify(babel.transformFile)(filePath, {
    sourceMaps: 'inline'
  })
  return code
}

async function run () {
  if (currentScript() === 'prepare') {
    for (const filePath of await packageFiles()) {
      if (filePath.endsWith('.js')) {
        console.log(`Compiling ${filePath}`)
        const contents = await compileFile(filePath)
        await writeFile(filePath, contents)
      }
    }
  } else {
    await removeDir('dist')
    await createDir('dist')
    for (const filePath of await packageFiles()) {
      if (filePath.endsWith('.js')) {
        console.log(`Compiling ${filePath} => dist/${filePath}`)
        const contents = await compileFile(filePath)
        await writeFile(path.join('dist', filePath), contents)
      } else {
        console.log(`Copying ${filePath} => dist/${filePath}`)
        const contents = await readFile(filePath)
        await writeFile(path.join('dist', filePath), contents)
      }
    }
  }
}

run()
