install:
	npm install
publish:
	npm publish
lint:
	npm run eslint .
gendiff:
	npm run babel-node src/bin/gendiff.js
test:
	npm test
