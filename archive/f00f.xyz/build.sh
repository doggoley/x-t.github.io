#!/usr/bin/env bash

prefix="src"
googleverif="google075961867084502e.html"

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

# Preview build's output
if [[ $1 == "preview" ]]; then
    if [[ $2 != "" ]]; then
        awk -f build.awk $2 | less
    else
        awk -f build.awk $prefix/index.html | less
    fi
    exit 0
fi

# Run
if [[ $1 == "run" ]]; then
    [ "$2" = "" ] && {
        python2.7 -m SimpleHTTPServer 8080
        exit 0
    }
    python2.7 -m SimpleHTTPServer $2
    exit 0
fi

# CSS and JS compilation
if [[ $1 == "full" ]]; then
echo "Building CSS..."
# Compile JS files
# Uses the Closure compiler (https://developers.google.com/closure/compiler/docs/gettingstarted_api)
#pushd resources/js
#rm *.min.js 2>&1 1>/dev/null
#for f in *js; do
#curl -s -d "compilation_level=SIMPLE_OPTIMIZATIONS&output_format=text&output_info=compiled_code&js_code=`cat $f | sed 's/\&/%26/g'`" -X POST https://closure-compiler.appspot.com/compile > $(echo $f | sed 's/js$/min/')
#done
#for f in *min; do mv $f $f.js ; done
#popd

# Compile CSS files
# Uses https://cssminifier.com/
pushd resources/css
rm *.min.css 2>&1 1>/dev/null
for f in *css; do
curl -X POST -s --data-urlencode "input@$f" https://cssminifier.com/raw > $(echo $f | sed 's/css$/min/')
done
for f in *min; do mv $f $f.css ; done
popd
fi

echo "Building site..."
# Site compilation
awk -f build.awk $prefix/index.html > index.html && ErrCheck
awk -f build.awk $prefix/about.html > about.html && ErrCheck
awk -f build.awk $prefix/places.html > places.html && ErrCheck
awk -f build.awk blog/src_2019.html > blog/2019.html && ErrCheck
awk -f build.awk blog/src_blogindex.html > blog/blogindex.html && ErrCheck
awk -f build.awk $prefix/reviews.html > reviews/index.html && ErrCheck

# Generate sitemap
# Do not include the Google verification page
echo "Building sitemap..."
(ls *html | grep -v "$googleverif" | xargs printf 'https://f00f.xyz/%s\n') > sitemap.txt
(ls blog/*html | xargs printf 'https://f00f.xyz/%s\n' | grep -v src) >> sitemap.txt
(ls blog/blog/*html | xargs printf 'https://f00f.xyz/%s\n') >> sitemap.txt

echo "Building blog posts..."
for f in blog/blog/src/*html; do awk -f build.awk $f > $(echo $f | sed 's/src\///'); done

