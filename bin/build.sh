rm -rf ./next
rm -r ./docs
next build
next export -o docs
touch docs/.nojekyll
echo 'xstate-flow-demo.sawyer.soy' > docs/CNAME