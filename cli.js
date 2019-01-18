#!/usr/bin/env node
const cosmiconfig = require('cosmiconfig')
const opts = require('yargs')
  .option('dry-run', {type: Boolean})
  .argv

const pkg = require('./package.json')
const sync = require('.')

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

