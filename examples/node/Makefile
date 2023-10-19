all:
	cd ../../ && yarn build

D := /Users/erin/mdm/Negotiator/Logs/vad-bad-start

run:
	node index.js $(D)/audio.txt  | tee /tmp/out.txt
	cat /tmp/out.txt | rg '^p ' | cut -c3- > $(D)/rickyt.txt

.PHONY: run all
