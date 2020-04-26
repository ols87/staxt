# staxt

A minimal static site generator. 

## concept

The idea behind staxt was to create a fast, lightweight, static site generator. Javascript src page files are combined with doT.js templates to deliver HTML. Sass is used for compiling css and Browserify is used to compile javascript files. 

## WARNING

This was as a personal project to practise NodeJS and morphed into an npm package. It is **NOT RECOMENDED** to use this in production.

## install

```
npm i staxt
```

## usage

### init

```
npx staxt init
```

Creates a new project with the following folder structure:

```
/src
  /assets
    /scss
      /main.scss
    /js
     /main.js
  /pages
    /index.js
    /index.xt.js
    /index.scss
  /templates
    /pages
      /pages.html
      /pages.scss
      /pages.js
    /includes
/dist
  /assets
    /js
      /main.js
    /css
      /main.css
    /images
```

### serve

```
npx staxt serve
```

Starts a browsersync server on port `:3000` and opens the browser. Use `-q` to prevent the browser from opening. Use `-w` to only watch the files.

### watch

### add

```
npx staxt add -p=[page] (or) -t=[template]
```

adds a new page or template

### remove

```
npx staxt remove -p=[page] (or) -t=[template]
```

Removes a page or template.

### compile

```
npx staxt compile -p=[page] (or) -t=[template] -i=[include]
```

Compiles a page or template or include.


### styles

```
npx staxt styles -a=[asset] -p=[page] -t[template]
```

Generates css for an asset or page or template

### scripts

```
npx staxt scripts -a=[asset] -p=[page] -t[template]
```

Generates js for an asset or page or template

### bundle
```
npx staxt bundle
```

Bundles all pages and assets.
