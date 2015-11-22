var MetadataHandler = function() {
    var self = this;

    this.urls = [
        {
            name: "Gmail",
            url: "mail.google.com"
        },
        {
            name: "WhatsApp",
            url: "web.whatsapp.com"
        }
    ];

    this.testURL = function(url) {
        regex = generateRegex();
        return regex.test(url);
    }

    var generateRegex = function() {
        var regexString = "(";
        self.urls.forEach(function(urlObject) {
            regexString = regexString + urlObject.url.replace(/\./g, "\\.") + "|";
        })
        regexString = regexString.replace(/\|$/, "");
        regexString = regexString + ")";
        return new RegExp(regexString, 'i')
    }
}

var metadataHandler = new MetadataHandler();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getStatus") {
        var locked = metadataHandler.testURL(sender.url);
        sendResponse({
            method: "getStatus",
            locked: locked
        });
    }
});