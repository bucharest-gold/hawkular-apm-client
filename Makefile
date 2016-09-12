ci: test
	npm run prepublish

test: lint
	npm run test

lint: node_modules
	npm run lint

clean:
	rm -rf node_modules

node_modules: package.json
	npm install

.PHONY: node_modules