const fse = require('fs-extra')
const globby = require('globby')
const {dirname, join} = require('path')

const DEFAULT_CONFIG = {
  from: 'node_modules',
  to: '_sass',
  packages: 'primer{,-*}',
  files: '**/*.scss'
}

module.exports = function sync(options) {
  const cwd = process.cwd()

  const config = Object.assign(
    {},
    DEFAULT_CONFIG,
    options
  )
  console.warn('config:', JSON.stringify(config))

  return getTasks(config)
    .then(tasks => {
      if (config.dryRun) {
        return tasks
      } else {
        return Promise.all(
          tasks.map(({source, dest}) => copy(source, dest))
        ).then(() => tasks)
      }
    })
}

module.exports.defaults = DEFAULT_CONFIG

function getTasks({from, to, packages, files}) {
  return globby(packages, {cwd: from, expandDirectories: false, onlyFiles: false})
    .then(packageDirs => {
      const globs = [
        '!**/node_modules',
        ...packageDirs.map(dir => join(dir, files))
      ]
      return globby(globs, {cwd: from, onlyFiles: true})
    })
    .then(paths => paths.map(path => ({
      source: join(from, path),
      dest: join(to, path)
    })))
}

function copy(from, to) {
  return fse.exists(to)
    .then(exists => exists ? fse.unlink(to) : true)
    .then(() => fse.ensureDir(dirname(to)))
    .then(() => fse.copy(from, to))
}
