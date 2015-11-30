var MetadataHandler = function() {
    var self = this;

    var storedHash = generateHash("aPassword");

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


    this.validate = function(hash) {
        return hash == storedHash;
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
    if (request.method == "LockStatus") {
        var locked = metadataHandler.testURL(sender.url);
        sendResponse({
            method: "LockStatus",
            locked: locked
        });
    }

    if (request.method == "Authenticate") {
        var authenticated = metadataHandler.validate(request.hash);
        sendResponse({
            method: "Authenticate",
            authenticated: authenticated
        });
    }
});