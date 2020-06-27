rm -rf ./next
rm -r ./docs
next build
next export -o docs
touch docs/.nojekyll