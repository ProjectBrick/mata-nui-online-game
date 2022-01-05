all: \
	init.swf \
	overlay.swf

init.swf:
	makeswf \
		-c -1 \
		-v 6 \
		-s 770x475 \
		-r 30 \
		-b 000000 \
		-o init.swf \
		init.as
	rm init.swf.*

overlay.swf:
	swfc overlay.sc
