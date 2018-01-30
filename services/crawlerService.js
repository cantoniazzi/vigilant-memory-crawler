const url = require('url');
const cheerio = require('cheerio');
const request = require('request');
const validUrl = require('valid-url');


const crawlerService = (function() {

    let crawlerService = function() {
    };

    var resolveImageUrl = function(imageUrl, uri) {
        if (imageUrl){
            if (validUrl.isUri(imageUrl)) {
                return validUrl.isUri(imageUrl);
            } else {
                let urlParsed = url.parse(uri, true, true);
                return urlParsed.protocol + '//' + urlParsed.hostname + imageUrl;
            }
        }
        return 'http://via.placeholder.com/350x150?text=sem-imagem';
    }

    crawlerService.prototype.getPageInfo = function(uri) {
        
        return new Promise(
            function(resolve, reject) {
                request({
                    method: 'GET',
                    url: uri
                }, function(err, response, body) {
                    if (err) reject(err);
                
                    $ = cheerio.load(body);
            
                    let title = $('meta[property="og:title"]').attr('content') || $("title").text();
                    let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
                    
                    let image = resolveImageUrl($('meta[property="og:image"]').attr('content'), uri);
                    let icon = resolveImageUrl($('link[rel=icon]').attr('href') || $('img').first().attr('src'), uri);
            
                    resolve({title: title, description: description, image: image, icon: icon});
                });
            }
        );
    }

    return crawlerService;

})();

module.exports = crawlerService;

