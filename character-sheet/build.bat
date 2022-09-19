npx tailwindcss -i ./src/input.css -o ./dist/output.css
npx webpack --mode development
cp ./src/index.html ./dist/index.html
