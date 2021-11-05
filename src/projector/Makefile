all: \
	matanuionlinegame.swf \
	matanuionlinegame-30fps.swf

matanuionlinegame.swf:
	printf '%s' 'Array(function(WIDTH, HEIGHT, OVERLAY, LSO, FPS) {' > matanuionlinegame.as
	cat ../shared/matanuionlinegame.as >> matanuionlinegame.as
	printf '\n%s' '})[0].call(this, 770, 475, true, true, 18);' >> matanuionlinegame.as
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

matanuionlinegame-30fps.swf:
	printf '%s' 'Array(function(WIDTH, HEIGHT, OVERLAY, LSO, FPS) {' > matanuionlinegame-30fps.as
	cat ../shared/matanuionlinegame.as >> matanuionlinegame-30fps.as
	printf '\n%s' '})[0].call(this, 770, 475, true, true, 30);' >> matanuionlinegame-30fps.as
	makeswf \
		-c -1 \
		-v 6 \
		-s 770x475 \
		-r 30 \
		-b 000000 \
		-o matanuionlinegame-30fps.main.swf \
		matanuionlinegame-30fps.as
	swfcombine \
		-v \
		-m \
		-l \
		-o matanuionlinegame-30fps.swf \
		matanuionlinegame-30fps.main.swf \
		-f 1=../shared/fonts/trademarker_light.swf \
		-f 1=../shared/fonts/gillsans.swf
	chmod -x matanuionlinegame-30fps.swf
	rm matanuionlinegame-30fps.as matanuionlinegame-30fps.main.swf*
