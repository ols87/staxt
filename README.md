# staxt
A minimal static site generator using Handlebars, Babel, Sass.

## concept
The idea behind staxt was to create a fast, lightweight, static site generator. Javascript src page files are combined with Handlebars templates to deliver HTML. Sass is used for compiling css and Babel is used to compile javascript asset files which can be written in ES6.

## WARNING
This was meant as a personal project to practise NodeJS and morphed into an npm package. It is **NOT RECOMENDED** to use this in production. 

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
  /templates
    /includes
      /header.hbs
      /footer.hbs
/dist
  /assets
    /main.js
    /main.css
    /images
```

### serve
```
npx staxt serve
```
Starts a browsersync server on port ```:3000```  and opens the browser. use argument ```-q``` to prevent the browser from opening.

### watch
```
npx staxt watch
```

Watches all files for changes. calls the relevant compiler depending on the type of file. Triggered automatically when running ```npx staxt serve```.

### add 
```npx staxt add -p=some/page/path -t=template/path```

Adds a new page and runs the ```compile```function. ```-t``` argument is optional. If no ```-t``` argument you will be prompted to choose an existing template or create a new template.

### remove
```npx staxt remove -p=some/page/path```

Removes page src files.

### compile
```npx staxt compile -p=some/page/path```

Compiles a single page when using ```-p```. Compiles a folder and all child pages when using wildcard e.g. ```-p=some/path/*```. Compiles all pages when no ```-p``` argument is given.

Called by:
- ```npx staxt add -p=some/path``` after src files are created.
- ```npx staxt watch``` when pages or templates are added/deleted/saved.
- ```npx staxt bundle```

### js
```npx staxt js```

Compile javascript src files. The entry point files is main.js. All imports must be included here.

Called by:
- ```npx staxt watch``` when javascript files are added/deleted/saved.
- ```npx staxt bundle```

### scss
```npx staxt scss```

Compile scss src files. The entry point files is main.scss. All imports must be included here.

Called by:
- ```npx staxt watch``` when scss files are added/deleted/saved.
- ```npx staxt bundle```

### images
```npx staxt images```

Compile scss src files. The entry point files is main.scss. All imports must be included here.

Called by:
- ```npx staxt watch``` when images are added/deleted/saved.
- ```npx staxt bundle```

### bundle
Bundles all src files. 

Calls:
- ```npx staxt compile```
- ```npx staxt images```
- ```npx staxt scss```
- ```npx staxt js```
