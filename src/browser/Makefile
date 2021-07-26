all: matanuionlinegame.swf

matanuionlinegame.swf:
	printf '%s' 'Array(function(WIDTH, HEIGHT, OVERLAY, LSO) {' > matanuionlinegame.as
	cat ../shared/matanuionlinegame.as >> matanuionlinegame.as
	printf '\n%s' '})[0].call(this, 770, 475, true, false);' >> matanuionlinegame.as
	makeswf \
		-c -1 \
		-v 6 \
		-s 770x475 \
		-r 18 \
		-b 000000 \
		-o matanuionlinegame.main.swf \
		matanuionlinegame.as
	swfcombine \
		-v \
		-m \
		-l \
		-o matanuionlinegame.swf \
		matanuionlinegame.main.swf \
		-f 1=../shared/fonts/trademarker_light.swf \
		-f 1=../shared/fonts/gillsans.swf
	chmod -x matanuionlinegame.swf
	rm matanuionlinegame.as matanuionlinegame.main.swf*
