const fse = require('fs-extra')
const globby = require('globby')
const {dirname, isAbsolute, join, resolve} = require('path')

module.exports = function getPathMap(options) {
  const cwd = process.cwd()

  let {
    sourceDir = 'node_modules',
    destDir = '_sass',
    packages = ['primer', 'primer-*'],
    fileGlob = '**/*.scss'
  } = options

  if (!isAbsolute(sourceDir)) sourceDir = join(cwd, sourceDir)
  if (!isAbsolute(destDir)) destDir = join(cwd, destDir)

  return getTasks({sourceDir, destDir, packages, fileGlob})
    .then(tasks => {
      if (options.dryRun) {
        return tasks
      } else {
        return Promise.all(
          tasks.map(({source, dest}) => copy(source, dest))
        ).then(() => tasks)
      }
    })
}

function getTasks({sourceDir, destDir, packages, fileGlob}) {
  return globby(packages, {cwd: sourceDir, expandDirectories: false, onlyFiles: false})
    .then(packageDirs => {
      console.warn(`got ${packageDirs.length} package dirs:`)
      for (const dir of packageDirs) {
        console.warn(`- ${dir}`)
      }
      const globs = ['!**/node_modules', ...packageDirs.map(dir => join(dir, fileGlob))]
      console.warn(`searching for globs in ${sourceDir}:`)
      for (const glob of globs) {
        console.warn(`- ${glob}`)
      }
      return globby(globs, {cwd: sourceDir, onlyFiles: true})
    })
    .then(paths => paths.map(path => ({
      source: join(sourceDir, path),
      dest: join(destDir, path)
    })))
}

function copy(from, to) {
  return fse.exists(to)
    .then(exists => exists ? fse.unlink(to) : true)
    .then(() => fse.ensureDir(dirname(to)))
    .then(() => fse.copy(from, to))
}
