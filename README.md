# staxt
A minimal static site generator using Handlebars, Babel, Sass

## install
```
npm i staxt
```

## Cli Usage
### init
```
npx staxt init
```
Creates a new prject with the following folder structure
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
Starts a browsersync server on port ```:3000```  and opens browser. use argument ```-q``` to prevent browser from opening
### watch
```
npx staxt watch
```
Watches all files for changes. calls the relevant compiler depending on the type of file. Triggered automically when running ```npx staxt serve``` 
### add 
```npx staxt add -p=some/page/path -t=template/path```
Adds a new page and runs the ```compile```function. ```-t``` argument is optional. If no ```-t``` argument you will be prompted to choose an exsisting template or create a new template.
### remove
```npx staxt remove -p=some/page/path```
Removes page src files
### compile
```npx staxt compile -p=some/page/path```
Compiles a single page when using ```-p``` and compiles a folder and all child pages when using wilcard e.g. ```-p=some/path/*```. Compiles all pages when no ```-p``` argument is given.

