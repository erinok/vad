all:
	yarn build
	yarn build-test-site

run:
	yarn serve-test-site

.PHONY: all run
