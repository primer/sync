#!/usr/bin/env node
const cosmiconfig = require('cosmiconfig')
const sync = require('.')

const opts = require('yargs')
  .usage('$0 [options] [<output directory>]')
  .option('from', {
    type: 'string',
    array: false,
    default: sync.defaults.from
  })
  .option('packages', {
    type: 'string',
    alias: 'p',
    default: sync.defaults.packages
  })
  .option('files', {
    type: String,
    array: false,
    alias: 'f',
    default: sync.defaults.files
  })
  .option('dry-run', {
    type: 'boolean',
    alias: 'n'
  })
  .alias('help', 'h')
  .argv

if (opts.help) {
  return yargs.showHelp()
}

const args = opts._
if (args.length === 2) {
  opts.from = args.shift()
}
if (args.length === 1) {
  opts.to = args.shift()
}


const pkg = require('./package.json')
const explorer = cosmiconfig(pkg.name)

explorer.search()
  .then(cosmic => {
    if (cosmic) {
      console.warn(`[primer-sync] found config in ${cosmic.filepath}`)
      return sync(Object.assign({}, cosmic.config, opts))
    } else {
      console.warn(`[primer-sync] no config found; using defaults...`)
      return sync(opts)
    }
  })
  .then(results => {
    console.warn(`${results.length} files copied:`)
    for (const {source, dest} of results) {
      console.log(`${source} → ${dest}`)
    }
  })

