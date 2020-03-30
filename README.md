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
watches all files for changes. calls the relevant compiler depending on the type of file. Triggered automically when running ```npx staxt serve``` 
