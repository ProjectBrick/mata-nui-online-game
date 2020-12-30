# Transform points source and destination pairs (TL  TR  BL  BR):
DMG_LABEL_PERSPECTIVE_11_0='0,0 227.5,96  1024,0 796.5,96  0,1024 182,624  1024,1024 842,624'
DMG_VENDOR_ICONSET_11_0='vendor/mac-11.0/Removable.iconset'

all: dmg-icon.iconset

clean:
	rm -rf dmg-icon.iconset

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
