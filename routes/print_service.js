var config = require('../config');
var phantom = require('phantom');

var print_with_phantom = function(req, content_url, file_name, callback) {
	phantom.create().then(function(ph) {
	    ph.createPage().then(function(page) {
			
			page.setContent(req.body.html, content_url);

			page.property('viewportSize', req.body.viewportSize).then(function() {
				page.property('paperSize', req.body.paperSize).then(function() {

					setTimeout(function() {
			        	page.render(__dirname + '/../public/' + file_name);
			        	callback(file_name);
			        }, 1000);
				});
			});

	    });
	});
}

exports.print = function(req, res, next) {
	var content_url  = '';
	var file_name = (new Date()).getTime() + '.pdf';

	print_with_phantom(req, content_url, file_name, function(pdflink) {
		console.log("New pdf created at: http://" + config.HOST_NAME + ":" + config.PORT + "/" + pdflink);
		res.json({ status: "success", url: "http://" + config.HOST_NAME + ":" + config.PORT + "/" + pdflink });
	});
}