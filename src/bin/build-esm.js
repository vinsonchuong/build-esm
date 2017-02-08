import * as path from 'path'
import * as fs from 'mz/fs'
import thenify from 'thenify'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import * as babel from 'babel-core'
import pkgfiles from 'pkgfiles'

async function packageFiles () {
  const [entries] = await thenify(pkgfiles)(process.cwd())
  return entries
    .filter(entry => !entry.isDirectory)
    .map(entry => entry.name)
}

async function compileFile(filePath) {
  const {code} = await thenify(babel.transformFile)(filePath, {
    sourceMaps: 'inline'
  })
  return code
}

async function writeFile(destinationPath, contents) {
  await thenify(mkdirp)(path.dirname(destinationPath))
  await fs.writeFile(destinationPath, contents)
}

async function copyFile(sourcePath, destinationPath) {
  const contents = await fs.readFile(sourcePath, 'utf8')
  await writeFile(destinationPath, contents)
}

async function makeEmptyDirectory (directoryPath) {
  await thenify(rimraf)(directoryPath)
  await thenify(mkdirp)(directoryPath)
}

async function run() {
  await makeEmptyDirectory('dist')
  for (const filePath of await packageFiles()) {
    if (filePath.endsWith('.js')) {
      console.log(`Compiling ${filePath} => dist/${filePath}`)
      const contents = await compileFile(filePath)
      await writeFile(path.join('dist', filePath), contents) 
    } else {
      console.log(`Copying ${filePath} => dist/${filePath}`)
      await copyFile(filePath, path.join('dist', filePath))
    }
  }
}

run()
