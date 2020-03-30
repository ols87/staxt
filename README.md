# staxt
A minimal static site generator using Handlebars, Babel, Sass.

## install
```
npm i staxt
```

## Cli Usage
### init
```
npx staxt init
```
Creates a new project with the following folder structur:
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
Starts a browsersync server on port ```:3000```  and opens browser. use argument ```-q``` to prevent browser from opening.

### watch
```
npx staxt watch
```

Watches all files for changes. calls the relevant compiler depending on the type of file. Triggered automically when running ```npx staxt serve```.

### add 
```npx staxt add -p=some/page/path -t=template/path```

Adds a new page and runs the ```compile```function. ```-t``` argument is optional. If no ```-t``` argument you will be prompted to choose an exsisting template or create a new template.

### remove
```npx staxt remove -p=some/page/path```

Removes page src files.

### compile
```npx staxt compile -p=some/page/path```

Compiles a single page when using ```-p```. Compiles a folder and all child pages when using wilcard e.g. ```-p=some/path/*```. Compiles all pages when no ```-p``` argument is given.

Called by:
- ```npx staxt add -p=some/path``` after src files are created.
- ```npx staxt watch``` when pages or templates are added/deleted/saved.
- ```npx staxt bundle```

### js
```npx staxt js```

Compile javscript src files. The entry point files is main.js. All imports must be included here.

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
