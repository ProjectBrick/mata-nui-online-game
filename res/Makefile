all: \
	icon.ico \
	icon.icns \
	exe-icon.ico \
	exe-header-55x55.bmp \
	exe-header-64x68.bmp \
	exe-header-83x80.bmp \
	exe-header-92x97.bmp \
	exe-header-110x106.bmp \
	exe-header-119x123.bmp \
	exe-header-138x140.bmp \
	exe-sidebar-164x314.bmp \
	exe-sidebar-192x386.bmp \
	exe-sidebar-246x459.bmp \
	exe-sidebar-273x556.bmp \
	exe-sidebar-328x604.bmp \
	exe-sidebar-355x700.bmp \
	exe-sidebar-410x797.bmp \
	dmg-icon.icns \
	dmg-background.png \
	dmg-background@2x.png

icon.ico:
	rm -rf icon.icoset
	mkdir icon.icoset
	rsvg-convert -o icon.icoset/icon.png src/icon.svg
	magick convert -strip icon.icoset/icon.png -resize 256x256 icon.icoset/icon_256x256.png
	magick convert -strip icon.icoset/icon.png -resize 128x128 icon.icoset/icon_128x128.bmp
	magick convert -strip icon.icoset/icon.png -resize 64x64   icon.icoset/icon_64x64.bmp
	magick convert -strip icon.icoset/icon.png -resize 48x48   icon.icoset/icon_48x38.bmp
	magick convert -strip icon.icoset/icon.png -resize 32x32   icon.icoset/icon_32x32.bmp
	magick convert -strip icon.icoset/icon.png -resize 24x24   icon.icoset/icon_24x24.bmp
	magick convert -strip icon.icoset/icon.png -resize 16x16   icon.icoset/icon_16x16.bmp
	magick convert -strip \
		icon.icoset/icon_256x256.png \
		icon.icoset/icon_128x128.bmp \
		icon.icoset/icon_64x64.bmp \
		icon.icoset/icon_48x38.bmp \
		icon.icoset/icon_32x32.bmp \
		icon.icoset/icon_24x24.bmp \
		icon.icoset/icon_16x16.bmp \
		icon.ico
	rm -rf icon.icoset

icon.icns:
	rm -rf icon.iconset
	mkdir icon.iconset
	rsvg-convert -w 896 -o icon.iconset/icon.png src/icon.svg
	magick convert -strip \
		icon.iconset/icon.png \
		-background none \
		-gravity center \
		-extent 1024x1024 \
		icon.iconset/icon.png
	magick convert -strip \
		icon.iconset/icon.png \
		\( +clone -background black -shadow 30x10+0+10 \) +swap \
		-crop 1024x1024+0+0 \
		-background none \
		-composite \
		icon.iconset/icon.png
	magick convert -strip icon.iconset/icon.png -resize 1024x1024 icon.iconset/icon_512x512@2x.png
	magick convert -strip icon.iconset/icon.png -resize 512x512   icon.iconset/icon_512x512.png
	magick convert -strip icon.iconset/icon.png -resize 512x512   icon.iconset/icon_256x256@2x.png
	magick convert -strip icon.iconset/icon.png -resize 256x256   icon.iconset/icon_256x256.png
	magick convert -strip icon.iconset/icon.png -resize 256x256   icon.iconset/icon_128x128@2x.png
	magick convert -strip icon.iconset/icon.png -resize 128x128   icon.iconset/icon_128x128.png
	magick convert -strip icon.iconset/icon.png -resize 64x64     icon.iconset/icon_32x32@2x.png
	magick convert -strip icon.iconset/icon.png -resize 32x32     icon.iconset/icon_32x32.png
	magick convert -strip icon.iconset/icon.png -resize 32x32     icon.iconset/icon_16x16@2x.png
	magick convert -strip icon.iconset/icon.png -resize 16x16     icon.iconset/icon_16x16.png
	node util/icns.js icon.iconset icon.icns
	rm -rf icon.iconset

exe-icon.ico:
	rm -rf exe-icon.icoset
	mkdir exe-icon.icoset
	rsvg-convert -w 896 -o exe-icon.icoset/icon.png src/icon.svg
	rsvg-convert -o exe-icon.icoset/base.png src/exe-icon-base.svg
	magick convert -strip \
		exe-icon.icoset/icon.png \
		-crop 896x512+0+0 \
		-background none \
		-gravity south \
		-extent 896x546 \
		-gravity north \
		-extent 1024x1024 \
		exe-icon.icoset/icon.png
	magick convert -strip \
		-size 1024x1024 xc:none \
		-size 1024x200 gradient:none-black -geometry +0+500 -composite \
		exe-icon.icoset/over.png
	magick convert -strip \
		exe-icon.icoset/icon.png \
		exe-icon.icoset/over.png -compose multiply -composite \
		exe-icon.icoset/icon.png -compose copyopacity -composite \
		exe-icon.icoset/icon.png
	magick convert -strip \
		-type truecolormatte \
		exe-icon.icoset/base.png \
		exe-icon.icoset/icon.png -composite \
		exe-icon.icoset/icon.png
	magick convert -strip exe-icon.icoset/icon.png -resize 256x256 exe-icon.icoset/icon_256x256.png
	magick convert -strip exe-icon.icoset/icon.png -resize 128x128 exe-icon.icoset/icon_128x128.bmp
	magick convert -strip exe-icon.icoset/icon.png -resize 64x64   exe-icon.icoset/icon_64x64.bmp
	magick convert -strip exe-icon.icoset/icon.png -resize 48x48   exe-icon.icoset/icon_48x38.bmp
	magick convert -strip exe-icon.icoset/icon.png -resize 32x32   exe-icon.icoset/icon_32x32.bmp
	magick convert -strip exe-icon.icoset/icon.png -resize 24x24   exe-icon.icoset/icon_24x24.bmp
	magick convert -strip exe-icon.icoset/icon.png -resize 16x16   exe-icon.icoset/icon_16x16.bmp
	magick convert -strip \
		exe-icon.icoset/icon_256x256.png \
		exe-icon.icoset/icon_128x128.bmp \
		exe-icon.icoset/icon_64x64.bmp \
		exe-icon.icoset/icon_48x38.bmp \
		exe-icon.icoset/icon_32x32.bmp \
		exe-icon.icoset/icon_24x24.bmp \
		exe-icon.icoset/icon_16x16.bmp \
		exe-icon.ico
	rm -rf exe-icon.icoset

exe-header-55x55.bmp:
	rsvg-convert -w 53 -o exe-header-55x55.tmp.png src/icon.svg
	magick convert -strip \
		exe-header-55x55.tmp.png \
		-background '#FFFFFF' \
		-gravity center \
		-extent 55x55 \
		-gravity southeast \
		-extent 55x55 \
		exe-header-55x55.bmp
	rm exe-header-55x55.tmp.png

exe-header-64x68.bmp:
	rsvg-convert -w 62 -o exe-header-64x68.tmp.png src/icon.svg
	magick convert -strip \
		exe-header-64x68.tmp.png \
		-background '#FFFFFF' \
		-gravity center \
		-extent 64x64 \
		-gravity southeast \
		-extent 64x68 \
		exe-header-64x68.bmp
	rm exe-header-64x68.tmp.png

exe-header-83x80.bmp:
	rsvg-convert -w 78 -o exe-header-83x80.tmp.png src/icon.svg
	magick convert -strip \
		exe-header-83x80.tmp.png \
		-background '#FFFFFF' \
		-gravity center \
		-extent 80x80 \
		-gravity southeast \
		-extent 83x80 \
		exe-header-83x80.bmp
	rm exe-header-83x80.tmp.png

exe-header-92x97.bmp:
	rsvg-convert -w 90 -o exe-header-92x97.tmp.png src/icon.svg
	magick convert -strip \
		exe-header-92x97.tmp.png \
		-background '#FFFFFF' \
		-gravity center \
		-extent 92x92 \
		-gravity southeast \
		-extent 92x97 \
		exe-header-92x97.bmp
	rm exe-header-92x97.tmp.png

exe-header-110x106.bmp:
	rsvg-convert -w 104 -o exe-header-110x106.tmp.png src/icon.svg
	magick convert -strip \
		exe-header-110x106.tmp.png \
		-background '#FFFFFF' \
		-gravity center \
		-extent 106x106 \
		-gravity southeast \
		-extent 110x106 \
		exe-header-110x106.bmp
	rm exe-header-110x106.tmp.png

exe-header-119x123.bmp:
	rsvg-convert -w 117 -o exe-header-119x123.tmp.png src/icon.svg
	magick convert -strip \
		exe-header-119x123.tmp.png \
		-background '#FFFFFF' \
		-gravity center \
		-extent 119x119 \
		-gravity southeast \
		-extent 119x123 \
		exe-header-119x123.bmp
	rm exe-header-119x123.tmp.png

exe-header-138x140.bmp:
	rsvg-convert -w 136 -o exe-header-138x140.tmp.png src/icon.svg
	magick convert -strip \
		exe-header-138x140.tmp.png \
		-background '#FFFFFF' \
		-gravity center \
		-extent 138x138 \
		-gravity southeast \
		-extent 138x140 \
		exe-header-138x140.bmp
	rm exe-header-138x140.tmp.png

exe-sidebar-164x314.bmp:
	magick convert -strip \
		src/exe-sidebar.png \
		-background '#FFFFFF' \
		-gravity center \
		-resize 164x314^ \
		-extent 164x314 \
		exe-sidebar-164x314.bmp

exe-sidebar-192x386.bmp:
	magick convert -strip \
		src/exe-sidebar.png \
		-background '#FFFFFF' \
		-gravity center \
		-resize 192x386^ \
		-extent 192x386 \
		exe-sidebar-192x386.bmp

exe-sidebar-246x459.bmp:
	magick convert -strip \
		src/exe-sidebar.png \
		-background '#FFFFFF' \
		-gravity center \
		-resize 246x459^ \
		-extent 246x459 \
		exe-sidebar-246x459.bmp

exe-sidebar-273x556.bmp:
	magick convert -strip \
		src/exe-sidebar.png \
		-background '#FFFFFF' \
		-gravity center \
		-resize 273x556^ \
		-extent 273x556 \
		exe-sidebar-273x556.bmp

exe-sidebar-328x604.bmp:
	magick convert -strip \
		src/exe-sidebar.png \
		-background '#FFFFFF' \
		-gravity center \
		-resize 328x604^ \
		-extent 328x604 \
		exe-sidebar-328x604.bmp

exe-sidebar-355x700.bmp:
	magick convert -strip \
		src/exe-sidebar.png \
		-background '#FFFFFF' \
		-gravity center \
		-resize 355x700^ \
		-extent 355x700 \
		exe-sidebar-355x700.bmp

exe-sidebar-410x797.bmp:
	magick convert -strip \
		src/exe-sidebar.png \
		-background '#FFFFFF' \
		-gravity center \
		-resize 410x797^ \
		-extent 410x797 \
		exe-sidebar-410x797.bmp

dmg-icon.icns:
	rm -rf dmg-icon.iconset
	mkdir dmg-icon.iconset
	rsvg-convert -o dmg-icon.iconset/icon.png src/icon.svg
	rsvg-convert -w 896 -o dmg-icon.iconset/base.png src/dmg-icon-base.svg
	magick convert -strip \
		dmg-icon.iconset/base.png \
		-background none \
		-gravity center \
		-extent 1024x1024 \
		dmg-icon.iconset/base.png
	magick convert -strip \
		dmg-icon.iconset/base.png \
		\( +clone -background black -shadow 30x10+0+10 \) +swap \
		-crop 1024x1024+0+0 \
		-background none \
		-composite \
		dmg-icon.iconset/base.png
	magick convert -strip \
		dmg-icon.iconset/icon.png \
		-resize 87.5% \
		-background none \
		-gravity center \
		-extent 1024x1024 \
		-distort perspective '0,0 208,110  1024,0 816,110  0,1024 158,700  1024,1024 866,700' \
		dmg-icon.iconset/icon.png
	magick convert -strip \
		-type truecolormatte \
		dmg-icon.iconset/base.png \
		dmg-icon.iconset/icon.png -composite \
		dmg-icon.iconset/icon.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 1024x1024 dmg-icon.iconset/icon_512x512@2x.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 512x512   dmg-icon.iconset/icon_512x512.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 512x512   dmg-icon.iconset/icon_256x256@2x.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 256x256   dmg-icon.iconset/icon_256x256.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 256x256   dmg-icon.iconset/icon_128x128@2x.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 128x128   dmg-icon.iconset/icon_128x128.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 64x64     dmg-icon.iconset/icon_32x32@2x.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 32x32     dmg-icon.iconset/icon_32x32.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 32x32     dmg-icon.iconset/icon_16x16@2x.png
	magick convert -strip dmg-icon.iconset/icon.png -resize 16x16     dmg-icon.iconset/icon_16x16.png
	node util/icns.js dmg-icon.iconset dmg-icon.icns
	rm -rf dmg-icon.iconset

dmg-background.png:
	rsvg-convert -o dmg-background.tmp.png src/dmg-background.svg
	magick convert -strip dmg-background.tmp.png dmg-background.png
	rm dmg-background.tmp.png

dmg-background@2x.png:
	rsvg-convert -x 2 -y 2 -o dmg-background@2x.tmp.png src/dmg-background.svg
	magick convert -strip dmg-background@2x.tmp.png dmg-background@2x.png
	rm dmg-background@2x.tmp.png
