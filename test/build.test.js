/* @flow */
import test from 'ava'
import execBin from 'build-esm/test/helpers/execBin'
import execInNode from 'build-esm/test/helpers/execInNode'
import readFile from 'build-esm/src/readFile'
import removeDir from 'build-esm/src/removeDir'

test('compiling a module', async t => {
  await execBin('build-esm', 'test/fixtures/project')

  t.is(
    await readFile('test/fixtures/project/dist/README.md'),
    await readFile('test/fixtures/project/README.md')
  )
  t.is(
    await readFile('test/fixtures/project/dist/package.json'),
    await readFile('test/fixtures/project/package.json')
  )
  t.is(await execInNode('test/fixtures/project/dist/index.js'), 'Text')

  t.is(
    await readFile('test/fixtures/project/dist/index.js.flow'),
    await readFile('test/fixtures/project/index.js')
  )
})

test.afterEach.always(async () => {
  await removeDir('test/fixtures/project/dist')
})
