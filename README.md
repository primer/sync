# primer-sync

Sync [Primer CSS](https://github.com/primer/primer) SCSS files installed with npm out of `node_modules`.

If you use Primer CSS with Jekyll on GitHub Pages, this is for you:

```sh
npx -p @primer/sync primer-sync
```

And that's it! All of the Primer CSS source files will be copied to your `_sass` directory so that you can use them without adding `node_modules` to your Sass include paths. Then, you can add these files to git instead of `node_modules`, and your site will build on Pages! :sparkles:


## Installation

If you plan on updating Primer CSS regularly, you should add it as a dev dependency with:

```sh
npm i -D @primer/sync
```

Then, whenever you update your `@primer/css` dependency, you can run it with:

```sh
npx primer-sync
```


## Usage

The `primer-sync` command line script works like this:

```
primer-sync [options] [<output directory>]

Options:
  --help, -h      Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --from                                      [string] [default: "node_modules"]
  --packages, -p                               [string] [default: "@primer/css"]
  --files, -f                                             [default: "**/*.scss"]
  --dry-run, -n                                                        [boolean]
```

For instance:

* `primer-sync foo` will copy all of the Primer CSS source files from
  `node_modules` to a directory named `foo` in your current working directory.
* `primer-sync --from ../node_modules src/_sass` will tell it to look for your
  npm modules in `../node_modules` and copy them to `src/_sass`.
* `primer-sync --packages "primer{,-*}"` will copy `primer` and `primer-*` SCSS files. (Use this with `primer` dependencies prior to v12.0.0.)
* `primer-sync --files '**/*.md'` will copy only Markdown (documentation) files
  rather than the SCSS sources.
* `primer-sync --dry-run` (or `primer-sync -n`) will print the copy operations
  so you can confirm what will be copied before actually doing it.


## License

[MIT](./LICENSE) &copy; [GitHub](https://github.com/)
