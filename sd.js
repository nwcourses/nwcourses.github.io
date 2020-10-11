const fs = require('fs').promises;
const showdown = require('showdown');
const converter = new showdown.Converter();
const contents = fs.readFile(process.argv[2], { encoding: 'UTF-8' } ).then ( text => {
	const html = converter.makeHtml(text);
	console.log(`<!DOCTYPE html><html><head><link rel='stylesheet' type='text/css' href='${process.argv[3]}' /></head><body>${html}</body></html>`);
});
