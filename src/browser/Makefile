all: \
	matanuionlinegame.swf \
	matanuionlinegame-30fps.swf

matanuionlinegame.swf:
	echo '_level0.__matanui = {FPS: "18", LSO: false};' > matanuionlinegame.as
	echo 'loadMovie("init.swf", "_level10000");' >> matanuionlinegame.as
	makeswf \
		-c -1 \
		-v 5 \
		-s 770x475 \
		-r 18 \
		-b 000000 \
		-o matanuionlinegame.swf \
		matanuionlinegame.as
	rm matanuionlinegame.as matanuionlinegame.swf.*

matanuionlinegame-30fps.swf:
	echo '_level0.__matanui = {FPS: "30", LSO: false};' > matanuionlinegame-30fps.as
	echo 'loadMovie("init.swf", "_level10000");' >> matanuionlinegame-30fps.as
	makeswf \
		-c -1 \
		-v 5 \
		-s 770x475 \
		-r 30 \
		-b 000000 \
		-o matanuionlinegame-30fps.swf \
		matanuionlinegame-30fps.as
	rm matanuionlinegame-30fps.as matanuionlinegame-30fps.swf.*
