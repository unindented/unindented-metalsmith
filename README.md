# Unindented (Website) [![Dependency Status](https://img.shields.io/gemnasium/unindented/unindented-metalsmith.svg)](https://gemnasium.com/unindented/unindented-metalsmith)

This is the source code for my website, [unindented.org](https://unindented.org/).

The contents themselves are versioned separately as a submodule. You can find them at <https://github.com/unindented/unindented-contents>.


## Install

If you have [io.js](https://iojs.org/) installed on your system, just run:

```sh
$ npm install
```


## Build

To build the site, do:

```sh
$ npm run build
```

If you want to see debugging info, set the `DEBUG` environment variable:

```sh
$ DEBUG='metalsmith:*' npm run build
```

I'm using the [debug](https://www.npmjs.com/package/debug) package, so you can do more complex things like:

```sh
$ DEBUG='metalsmith:*,-metalsmith:ignore,-metalsmith:path' npm run build
```


## Watch

If you want to rebuild the site every time you change a file, run this instead:

```sh
$ npm run watch
```


## Icons

To generate all icons, do:

```sh
$ npm run icons
```

This will invoke [ImageMagick](http://www.imagemagick.org/)'s `convert -resize` to create `.ico` files, and [Inkscape](http://www.inkscape.org/)'s `inkscape --export-png` to create `.png` files.

**NOTE:** You will need to have [ImageMagick](http://www.imagemagick.org/) and [Inkscape](http://www.inkscape.org/) installed (obviously):

```sh
$ brew install imagemagick inkscape
```


## Meta

* Code: `git clone git://github.com/unindented/unindented-metalsmith.git`
* Home: <https://unindented.org/>


## Contributors

Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2015 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
