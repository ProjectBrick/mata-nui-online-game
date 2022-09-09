# Transform points source and destination pairs (TL  TR  BL  BR):
DMG_LABEL_PERSPECTIVE_11_0='0,0 227.5,96  1024,0 796.5,96  0,1024 182,624  1024,1024 842,624'
DMG_VENDOR_ICONSET_11_0='vendor/mac-11.0/Removable.iconset'


all: \
	inno-sidebar/410x797.bmp \
	inno-sidebar/355x700.bmp \
	inno-sidebar/328x604.bmp \
	inno-sidebar/273x556.bmp \
	inno-sidebar/246x459.bmp \
	inno-sidebar/192x386.bmp \
	inno-sidebar/164x314.bmp \
	inno-header/138x140.bmp \
	inno-header/119x123.bmp \
	inno-header/110x106.bmp \
	inno-header/92x97.bmp \
	inno-header/83x80.bmp \
	inno-header/64x68.bmp \
	inno-header/55x55.bmp \
	dmg-icon.iconset


clean:
	rm -rf inno-sidebar/*.bmp
	rm -rf inno-header/*.bmp
	rm -rf dmg-icon.iconset


inno-sidebar/410x797.bmp:
	magick convert inno-sidebar/410x797.png bmp2:$@

inno-sidebar/355x700.bmp:
	magick convert inno-sidebar/355x700.png bmp2:$@

inno-sidebar/328x604.bmp:
	magick convert inno-sidebar/328x604.png bmp2:$@

inno-sidebar/273x556.bmp:
	magick convert inno-sidebar/273x556.png bmp2:$@

inno-sidebar/246x459.bmp:
	magick convert inno-sidebar/246x459.png bmp2:$@

inno-sidebar/192x386.bmp:
	magick convert inno-sidebar/192x386.png bmp2:$@

inno-sidebar/164x314.bmp:
	magick convert inno-sidebar/164x314.png bmp2:$@


inno-header/138x140.bmp:
	magick convert inno-header/138x140.png bmp2:$@

inno-header/119x123.bmp:
	magick convert inno-header/138x140.png bmp2:$@

inno-header/110x106.bmp:
	magick convert inno-header/138x140.png bmp2:$@

inno-header/92x97.bmp:
	magick convert inno-header/138x140.png bmp2:$@

inno-header/83x80.bmp:
	magick convert inno-header/138x140.png bmp2:$@

inno-header/64x68.bmp:
	magick convert inno-header/138x140.png bmp2:$@

inno-header/55x55.bmp:
	magick convert inno-header/138x140.png bmp2:$@


dmg-icon.iconset:
	mkdir dmg-icon.iconset
	magick convert dmg-icon-label/512x512@2x.png -virtual-pixel transparent -distort perspective $(DMG_LABEL_PERSPECTIVE_11_0) dmg-icon.iconset/label.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_512x512@2x.png dmg-icon.iconset/label.png -resize 1024x1024 -composite dmg-icon.iconset/icon_512x512@2x.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_512x512.png    dmg-icon.iconset/label.png -resize 512x512   -composite dmg-icon.iconset/icon_512x512.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_256x256@2x.png dmg-icon.iconset/label.png -resize 512x512   -composite dmg-icon.iconset/icon_256x256@2x.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_256x256.png    dmg-icon.iconset/label.png -resize 256x256   -composite dmg-icon.iconset/icon_256x256.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_128x128@2x.png dmg-icon.iconset/label.png -resize 256x256   -composite dmg-icon.iconset/icon_128x128@2x.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_128x128.png    dmg-icon.iconset/label.png -resize 128x128   -composite dmg-icon.iconset/icon_128x128.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_32x32@2x.png   dmg-icon.iconset/label.png -resize 64x64     -composite dmg-icon.iconset/icon_32x32@2x.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_32x32.png      dmg-icon.iconset/label.png -resize 32x32     -composite dmg-icon.iconset/icon_32x32.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_16x16@2x.png   dmg-icon.iconset/label.png -resize 32x32     -composite dmg-icon.iconset/icon_16x16@2x.png
	magick convert $(DMG_VENDOR_ICONSET_11_0)/icon_16x16.png      dmg-icon.iconset/label.png -resize 16x16     -composite dmg-icon.iconset/icon_16x16.png
	rm dmg-icon.iconset/label.png
