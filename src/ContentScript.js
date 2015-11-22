var ContentHandler = function() {
    this.authorize = function(locked) {
        if (locked) {
            alert("This needs authorization!");
        }
    }
}

var contentHandler = new ContentHandler();
chrome.runtime.sendMessage({
        method: "getStatus"
    },
    function(response) {
        console.log("This URL is " + (response.locked ? "locked" : "not locked"));
        contentHandler.authorize(response.locked);

    }
);