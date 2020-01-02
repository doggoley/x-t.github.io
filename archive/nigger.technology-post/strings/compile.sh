#!/bin/bash

echo "[WARNING] All files within json/ are unusable!"
echo "[WARNING] They are intermediary files for the final strings.json"

pushd () {
    command pushd "$@" > /dev/null
}

popd () {
    command popd "$@" > /dev/null
}

pushd ./raw
for f in *txt; do 

lang=$(echo $f | sed 's/strings.//; s/.txt//;')

echo "[Pass 1] Compiling" $lang "to JSON..."

jsonname=$(printf 'strings.%s.json' $lang)
printf "\"%s\": {\n" $lang > ../json/$jsonname
while read -r line; do

id=$( cut -d ' ' -f 1 <<< "$line" )
string=$( cut -d ' ' -f 2- <<< "$line" )
if [[ $id != "" ]]; then
string=$(echo -n $string | sed 's/\"/\&quot\;/')
echo "\"${id}\": \"${string}\"," >> ../json/$jsonname
fi

done < $f
echo "}," >> ../json/$jsonname
done
popd

echo "[Pass 2] Making main JSON..."
echo "{" > strings.json
echo -n "\"langs\": [" >> strings.json
pushd ./json

for f in *json; do 

lang=$(echo $f | sed 's/strings.//; s/.json//;')

echo "[Pass 2] Adding" $lang "to main JSON..."
printf "\"%s\"," $lang >> ../strings.json

done
popd
echo "]," >> strings.json
echo "\"translate\": {" >> strings.json


pushd ./json
for f in *json; do 

lang=$(echo $f | sed 's/strings.//; s/.json//;')

echo "[Pass 3] Merging" $lang "to main JSON..."

cat $f >> ../strings.json

done
popd

echo "[Pass 3] Completing file..."
echo "}" >> strings.json
echo "}" >> strings.json

echo "[Pass 4] Fix trailing commas..."
perl -MJSON -e '@text=(<>);print to_json(from_json("@text", {relaxed=>1}))' strings.json > strings.final.json
rm strings.json
mv strings.final.json strings.json
