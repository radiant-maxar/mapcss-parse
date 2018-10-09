# mapcss-parse :earth_africa::earth_americas::earth_asia:
### MapCSS parser for OpenStreetMap tagging validation 

## About

MapCSS is the file format [JOSM](https://josm.openstreetmap.de/) uses to express custom tag validation rules.
mapcss-parse makes this format and the rules it can express available to JavaScript and node applications.

See [here](https://josm.openstreetmap.de/wiki/Help/Validator/MapCSSTagChecker) and [here](https://josm.openstreetmap.de/wiki/Help/Styles/MapCSSImplementation) for more info about JOSM's use of MapCSS for tag validation rules.

## Development

the project was developed using node 10.7.0 as it makes use of JavaScript's awesome new [Lookbehinds](http://kangax.github.io/compat-table/es2016plus/#test-RegExp_Lookbehind_Assertions)!



[get nvm on linux/macOS!](https://github.com/creationix/nvm#installation) 

[get nvm on windows!](https://github.com/coreybutler/nvm-windows)

...on both operating systems
```
nvm install 10.7.0 && nvm use 10.7.0 
```


```
yarn install # or npm install
```

### Test

```
yarn test # or npm test
```

### Build the source
```
yarn build # or npm run build
```

