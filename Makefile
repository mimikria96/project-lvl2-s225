install:
	npm install
publish:
	npm publish
lint:
	npm run eslint src/
gendiff:
	npm run babel-node src/bin/gendiff.js
