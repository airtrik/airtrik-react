npm publish
ver=$(<version.txt)
git add .
git commit -m "v"$ver
git push -u origin master
git checkout -b "v"$ver
git push -u origin "v"$ver
git checkout master