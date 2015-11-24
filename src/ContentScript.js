var ContentHandler = function() {
    var self = this;

    this.authorize = function(locked) {
        if (!isAuthorisedDomain() && locked) {
            window.stop();
            displayModal();
        }
    }

    this.onAuthenticationFinished = function(event) {
        event.preventDefault();
        console.log('Entered Password ' + document.getElementById('secret').value);
        onSuccess();
        return false;
    }

    var isAuthorisedDomain = function() {
        return location.hostname == sessionStorage.getItem('lastDomain');
    }

    var displayModal = function() {
        var body = document.createElement("body");
        document.body = body;
        var iFrame  = document.createElement("div");

        iFrame.innerHTML  =
        "<link type='text/css' href='" + chrome.extension.getURL("css/modal.css") + "' rel='stylesheet'/>"
        + "<div id='modal-div'>"
            + "<p>This URL needs authentication!</p>"
            + "<hr>"
            + "<form id='pass-form' method='post'>"
                + "<div id='password-div'><label>Enter Password : </label><input type='password' id='secret' name='secret'/></div>"
            + "</form>"
        + "</div>";

        document.body.insertBefore(iFrame, document.body.firstChild);
        $('#pass-form').submit(self.onAuthenticationFinished);
    }

    var onSuccess = function() {
        sessionStorage.setItem('lastDomain', location.hostname);
        location.reload();
    }
}

var contentHandler = new ContentHandler();

chrome.runtime.sendMessage({
        method: "LockStatus"
    },
    function(response) {
        console.log("This URL is " + (response.locked ? "locked" : "not locked"));
        contentHandler.authorize(response.locked);
    }
);