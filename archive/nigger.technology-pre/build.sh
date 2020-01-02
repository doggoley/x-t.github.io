#!/usr/bin/env bash

command -v awk 2>&1 1>/dev/null
[ $? -ne 0 ] && {
    echo "Error: Awk not found"
    exit 1
}

ErrCheck() {
    [ $? -ne 0 ] && exit 2
}

pushd () {
    command pushd "$@" > /dev/null
}

popd () {
    command popd "$@" > /dev/null
}

if [[ $1 == "preview" ]]; then
    if [[ $2 != "" ]]; then
        awk -f build.awk $2 | less
    else
        awk -f build.awk src/index.html | less
    fi
    exit 0
fi

echo "Building site..."
# Site compilation
awk -f build.awk src/en/index.html > index.html && ErrCheck
awk -f build.awk src/en/about.html > about.html && ErrCheck
awk -f build.awk src/en/fresh.html > fresh.html && ErrCheck
awk -f build.awk src/en/gallery.html > gallery.html && ErrCheck
awk -f build.awk src/en/404.html > 404.html && ErrCheck
mkdir lt
awk -f build.awk src/lt/index.html > lt/index.html && ErrCheck
awk -f build.awk src/lt/about.html > lt/about.html && ErrCheck
awk -f build.awk src/lt/fresh.html > lt/fresh.html && ErrCheck
awk -f build.awk src/lt/gallery.html > lt/gallery.html && ErrCheck
awk -f build.awk src/lt/404.html > lt/404.html && ErrCheck
mkdir ee
awk -f build.awk src/ee/index.html > ee/index.html && ErrCheck
awk -f build.awk src/ee/about.html > ee/about.html && ErrCheck
awk -f build.awk src/ee/fresh.html > ee/fresh.html && ErrCheck
awk -f build.awk src/ee/gallery.html > ee/gallery.html && ErrCheck
awk -f build.awk src/ee/404.html > ee/404.html && ErrCheck
mkdir ro
awk -f build.awk src/ro/index.html > ro/index.html && ErrCheck
awk -f build.awk src/ro/about.html > ro/about.html && ErrCheck
awk -f build.awk src/ro/fresh.html > ro/fresh.html && ErrCheck
awk -f build.awk src/ro/gallery.html > ro/gallery.html && ErrCheck
awk -f build.awk src/ro/404.html > ro/404.html && ErrCheck
mkdir de
awk -f build.awk src/de/index.html > de/index.html && ErrCheck
awk -f build.awk src/de/about.html > de/about.html && ErrCheck
awk -f build.awk src/de/fresh.html > de/fresh.html && ErrCheck
awk -f build.awk src/de/gallery.html > de/gallery.html && ErrCheck
awk -f build.awk src/de/404.html > de/404.html && ErrCheck
mkdir pl
awk -f build.awk src/pl/index.html > pl/index.html && ErrCheck
awk -f build.awk src/pl/about.html > pl/about.html && ErrCheck
awk -f build.awk src/pl/fresh.html > pl/fresh.html && ErrCheck
awk -f build.awk src/pl/gallery.html > pl/gallery.html && ErrCheck
awk -f build.awk src/pl/404.html > pl/404.html && ErrCheck
mkdir cz
awk -f build.awk src/cz/index.html > cz/index.html && ErrCheck
awk -f build.awk src/cz/about.html > cz/about.html && ErrCheck
awk -f build.awk src/cz/fresh.html > cz/fresh.html && ErrCheck
awk -f build.awk src/cz/gallery.html > cz/gallery.html && ErrCheck
awk -f build.awk src/cz/404.html > cz/404.html && ErrCheck
mkdir it
awk -f build.awk src/it/index.html > it/index.html && ErrCheck
awk -f build.awk src/it/about.html > it/about.html && ErrCheck
awk -f build.awk src/it/fresh.html > it/fresh.html && ErrCheck
awk -f build.awk src/it/gallery.html > it/gallery.html && ErrCheck
awk -f build.awk src/it/404.html > it/404.html && ErrCheck
mkdir rs
awk -f build.awk src/rs/index.html > rs/index.html && ErrCheck
awk -f build.awk src/rs/about.html > rs/about.html && ErrCheck
awk -f build.awk src/rs/fresh.html > rs/fresh.html && ErrCheck
awk -f build.awk src/rs/gallery.html > rs/gallery.html && ErrCheck
awk -f build.awk src/rs/404.html > rs/404.html && ErrCheck

# Generate sitemap
echo "Building sitemap..."
(ls *.html | xargs printf 'https://nigger.technology/%s\n') > sitemap.txt
(ls lt/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt
(ls ee/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt
(ls ro/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt
(ls de/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt
(ls pl/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt
(ls cz/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt
(ls it/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt
(ls rs/*html | xargs printf 'https://nigger.technology/%s\n') >> sitemap.txt

# Minify JS and CSS
#echo "Compiling JS..."
# Compile JS files
# Uses the Closure compiler (https://developers.google.com/closure/compiler/docs/gettingstarted_api)
#pushd ./js
#for f in *js; do
#../js_comp.sh < $f > $(echo $f | sed 's/js$/min/')
#done
#for f in *min; do mv $f $f.js ; done
#popd
echo "Compiling CSS..."
# Compile CSS files
# Uses https://cssminifier.com/
pushd ./css
for f in *css; do
curl -X POST -s --data-urlencode "input@$f" https://cssminifier.com/raw > $(echo $f | sed 's/css$/min/')
done
for f in *min; do mv $f $f.css ; done
popd