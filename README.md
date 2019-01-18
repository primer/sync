# primer-sync

Sync [Primer CSS](https://github.com/primer/primer) SCSS files installed with npm out of `node_modules`.

If you use Primer CSS with Jekyll on GitHub Pages, this is for you:

```sh
npx @primer/sync
```

And that's it! All of the Primer CSS source files will be copied to your `_sass` directory so that you can use them without adding `node_modules` to your Sass include paths. Then, you can add these files to git instead of `node_modules`, and your site will build on Pages! :sparkles:
