const TGA = require('tga');
const PNG = require('pngjs').PNG;

module.exports = function(source) {
	this.resourcePath += ".png";
	const callback = this.async();

	const tga = new TGA(source);
	const png = new PNG({
		width: tga.width,
		height: tga.height
	});
	png.data = Buffer.from(tga.pixels);

	const stream = png.pack();
	const buffers = [];
	stream.on('data', data => buffers.push(data));
	stream.on('end', () => callback(null, Buffer.concat(buffers)));
};

module.exports.raw = true;
