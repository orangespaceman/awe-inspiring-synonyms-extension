/*
 * Awesome replacement...
 *
 *
 */
(function() {

    "use strict";

    // update button state when find and replace has completed
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        switch(request.type) {
            case "awesome-count":
                var wordCount = request.data.wordCount.toString();
                var counter = request.data.counter.toString();

                chrome.browserAction.setTitle({
                    title: "Toggle display of " + counter + " replaced words"
                });
                chrome.browserAction.setBadgeText({
                    text: counter
                });
            break;
        }
        return true;
    });


    // toggle state when button is clicked
    chrome.browserAction.onClicked.addListener(function(tab){
        chrome.tabs.sendMessage(tab.id, { action: "toggle-state" });
    });

})();