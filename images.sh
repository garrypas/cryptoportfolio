echo "var images = {};" > ./images.js;
find ./images/*.png -not -name '*@*' -type f -maxdepth 1 | sed -e 's,^\./images/,,' | sed -e 's,\.png,,' | 
while read f; do
    IMGKEY=`echo $f | tr 'a-z' 'A-Z'`
    echo "images['$IMGKEY'] = require('./images/$f.png');"; 
done >> ./images.js; echo "module.exports = images;" >> ./images.js
