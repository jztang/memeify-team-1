/* The function maps the updateImage function on every image
 * in the document
 */
function replaceImages() {
    Array.prototype.map.call(document.images, updateImage);
}

/* The function updates an existing image with a meme
 * @param image the image to update
 */
function updateImage(image) {

    // If the image has already been updated to a meme then don't re-update
    if (image.className.indexOf('meme') > -1) {
        return;
    }

    // Add 'meme' to the class name list to reflect image has been updates
    image.classList.add('meme');

    // Get the url of the meme
    var path = chrome.runtime.getURL("images/meme" + Math.floor(Math.random() * 7) + ".jpg");

    // Update the image source url to reflect the meme url
    image.src = path;
    if (image.srcset) {
        image.srcset = path;
    }
}

// Call the replaceImages function
window.setTimeout(replaceImages, 1000);


// Get all elements in the document
var elements = document.getElementsByTagName('*');

// Iterate through every element
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    // Iterate through childNode of the element
    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        // If the childNode is of type text then update
        if (node.nodeType === 3) {
            // Get the current text
            var text = node.nodeValue;
            // Update the existing text with 'MEME'
            var replacedText = text.replace(/b/gi, "\uD83C\uDD71").replace(/the/gi, 'MEME');

            // Check if the correct text has been replaced, else update with original
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}