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
        var password = document.getElementById('secret').value;
        validateCredentials(password);
        return false;
    }

    var isAuthorisedDomain = function() {
        return location.hostname == sessionStorage.getItem('lastDomain');
    }

    var validateCredentials = function(password) {
        var hash = generateHash(password);
        console.log(hash);
        onSuccess();
        return true;
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
                + "<div id='password-div'><label>Enter Password : </label><input type='password' id='secret' name='secret' autofocus/></div>"
            + "</form>"
        + "</div>";

        document.body.insertBefore(iFrame, document.body.firstChild);
        $('#pass-form').submit(self.onAuthenticationFinished);
    }

    var onSuccess = function() {
        sessionStorage.setItem('lastDomain', location.hostname);
        document.getElementById('modal-div').style.backgroundColor = '#008800';
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