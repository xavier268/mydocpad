#! /bin/bash

echo "=================Welcome !==================="
echo "Preparing a full working custom framework to use Docpad"
echo "(c) Xavier Gandillot <xavier@gandillot.com>"
echo "================= Installing ================="
npm install
node_modules/.bin/bower install
echo "================= Versions ==================="
echo "docpad : $(node_modules/.bin/docpad --version)"
echo "bower : $(node_modules/.bin/bower --version)"
echo "s3cmd : $(s3cmd --version)"
echo "node : $(node --version)"
echo "npm : $(npm --version)"
echo "$(npm ls -g --depth=0)"
echo "$(npm ls --depth=0)"
echo "================ Running ===================="
npm start
