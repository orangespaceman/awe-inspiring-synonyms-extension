/*
 * Awesome replacement...
 *
 *
 */
(function() {

    "use strict";

    // count how many replacements we've made
    var counter = 0;

    // strings to find and replace
    var findAndReplace = [
        { word: "awesome", replacements: ["awe-inspiring","terrific", "fantastic", "amazing", "super", "stupendous", "outstanding", "great", "incredible", "marvelous", "wonderful", "fabulous", "impressive", "extraordinary", "magnificent", "superb", "astounding", "tremendous", "excellent", "exceptional", "awe-inspiring", "wondrous", "phenomenal", "actually quite good", "reasonably impressive", "marginally improved", "somewhat notable", "vaguely of interest"] },
        { word: "sucks", replacements: ["is pretty terrible", "is rather awful", "is disappointingly bad"] }
    ];


    // init!
    addStyles();
    findAndReplace.forEach(function(wordObj){
        awesomeFind(wordObj.word, wordObj.replacements);
    });


    // insert page styles to display word replacements
    function addStyles() {

        // Create the <style> tag
        var style = document.createElement("style");

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        style.sheet.addRule("ins.awesome-replaced", "text-decoration:none;background:transparent;");
        style.sheet.addRule("abbr.awesome-replacement", "border-bottom:1px dotted #000; cursor:help;");
        style.sheet.addRule("body.show-awesome-replaced abbr.awesome-replacement", "background:#ff0;");
    }


    // show/hide changed words on button click
    function toggleState() {
        document.body.classList.toggle("show-awesome-replaced");
    }


    // find text nodes, test for presence of word to replace
    function awesomeFind(word, replacements, element) {
        if (!element) { element = document.body; }
        var nodes = element.childNodes;
        for (var node = 0; node < nodes.length; node++) {

            // only test text nodes
            if (nodes[node].nodeType == Node.TEXT_NODE) {
                var regEx = new RegExp(word, "gi");

                // replace word?
                if (nodes[node].textContent.match(regEx)) {
                    counter++;
                    awesomeReplace(nodes[node], word, replacements);
                }
            } else {
                awesomeFind(word, replacements, nodes[node]);
            }
        }
    }


    // find and replace existing text node with new word
    function awesomeReplace(textNode, word, replacements) {

        var originalString = textNode.textContent;

        // generate el to replace
        var ins = document.createElement("ins");
        ins.classList.add("awesome-replaced");

        // pick string to replace
        var rand = Math.floor(Math.random()*replacements.length);
        var regEx = new RegExp(word, "gi");
        ins.innerHTML = originalString.replace(regEx, "<abbr class='awesome-replacement' title='"+word+" replacement #"+counter+"'>"+replacements[rand]+"</abbr>");

        // update DOM with new el
        textNode.parentNode.insertBefore(ins, textNode);
        textNode.parentNode.removeChild(textNode);
    }


    // report to BG process
    chrome.extension.sendMessage({
        type: "awesome-count",
        data: {
            wordCount: findAndReplace.length,
            counter: counter
        }
    });


    // detect messages from BG process
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "toggle-state") {
            toggleState();
        }
    });

})();