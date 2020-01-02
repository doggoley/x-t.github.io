# WARNING! Remaster 2019-01-03: Must be hosted on root, must be built. Build instructions inside this README.

## nigger.technology
### made by [zxyz](https://zxyz.best), [freeshxyz](https://freesh.xyz/)

## How to use
Automatically compiled by gitlab's CI/CD

Manual compilation - `./build.sh`

Preview build output before building - `./build.sh preview (file)`

## Compiler args
Use
* `<!-- NAVBAR -->` - inserts navbar
* `<!-- HEAD -->` - inserts standard `<head>` structure
* `<!-- TITLE [?] -->` - sets page title
* `<!-- DESC [?] -->` - sets page description

## Support?
fuck off

## Localization guide

1. Make a copy of the site in `src/en/` with the country's code, eg. `src/lt/`
2. Translate all pages to your chosen language
3. Change page's `<html lang="en">` with the language code
4. Replace `var LOCALIZED = false;` with `var LOCALIZED = true;`
5. Copy navbar in `html/navbar.html` with the country name appended, eg. `html/navbar_lt.html`
6. Translate navbar
7. Replace 
```js
<a href="javascript:moveLocalized()" class="f-l" id="localized" style="display:none"></a>
```
with
```js
<a class="f-l" href="javascript:moveEnglish()">EN</a>
```
8. Replace `<!-- NAVBAR -->` mentions with `<!-- NAVBAR_COUNTRY -->`, replace `COUNTRY` with the country code.
9. Add the country in `js/localization.js`
```js
var langs = ["LT","EE","RO","DE","PL","CZ","IT","RS","COUNTRY"];
```
10. Add your navbar translation for compilation in `build.awk`:
```
in BEGIN...
    r_navbar_country = ReadFile("html/navbar_country.html")
```
```
in {...
    gsub(/<!-- NAVBAR_COUNTRY -->/, r_navbar_country)
```
11. Add your translation in `build.sh`:
```
mkdir country
awk -f build.awk src/country/index.html > country/index.html && ErrCheck
awk -f build.awk src/country/about.html > country/about.html && ErrCheck
awk -f build.awk src/country/fresh.html > country/fresh.html && ErrCheck
awk -f build.awk src/country/gallery.html > country/gallery.html && ErrCheck
```

## License
Proprietary, refrer to [LICENSE](LICENSE). Many internals (CSS, build system) were based on f00f.xyz.