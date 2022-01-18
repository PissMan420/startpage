function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function choice(array) {
    var chosenidx = randomInt(0, array.length - 1);
    return array[chosenidx];
}
/**
* This function generated an `len` long random series of number
* @param len The lenght of the id to generate.
* @return The generated id.
*/
function randId(len) {
    if (len === void 0) { len = 12; }
    var alphabet = [];
    // add all the numbers to the alphabet array by looping through ascii char 
    // code.
    for (var charcode = 48; charcode < 58; charcode++)
        alphabet.push(String.fromCharCode(charcode));
    // add all the alphabet to the alphabet array by looping through ascii char 
    // code.
    for (var charcode = 65; charcode <= 90; charcode++)
        alphabet.push(String.fromCharCode(charcode));
    for (var charcode = 65; charcode <= 90; charcode++)
        alphabet.push(String.fromCharCode(charcode).toLowerCase());
    var str = '';
    for (var _ = 0; _ < len; _++)
        str += choice(alphabet);
    return str;
}
/**
* Add a new link to one of the category.
* @return The list element of the link category
*/
function addBookmark(_a) {
    var category = _a.category, link = _a.link, name = _a.name, icon = _a.icon;
    var id = randId(6);
    var categoryBtnList = document.getElementById(category).querySelector('ul');
    if (categoryBtnList === null)
        throw new ReferenceError('Could not find the unordered list element inside category children');
    var template = "<li id=\"" + id + "\">";
    template += "<a href=\"" + link + "\">" + name + "</a>";
    template += "<img src=\"/favicon/" + new URL(link).hostname + "\"></img>";
    template += '</li>';
    categoryBtnList.insertAdjacentHTML('beforeend', template);
    return document.getElementById(id);
}
var youtubePlayer;
(function (youtubePlayer) {
    /**
     * Set the youtube player to play the video with the given id.
     * @param urlOrId The ID (something like this JBFT7w5RpQo) or the video link
     *   (example: https://www.youtube.com/watch?v=JBFT7w5RpQo) to set the video to.
     */
    function setVideo(urlOrId) {
        var id = '';
        try {
            id = new URL(urlOrId).searchParams.get('v');
        }
        catch (_a) {
            id = urlOrId;
        }
        var video = document.getElementById('youtube-player');
        video.src = "https://www.youtube.com/embed/" + id;
    }
    document.addEventListener('load', function () {
        setTimeout(function () { return setVideo('dQw4w9WgXcQ'); }, 6000);
    });
})(youtubePlayer || (youtubePlayer = {}));
// Append the default bookmarks
addBookmark({ category: 'social-media', link: 'https://instagram.com', name: 'Instagram' });
addBookmark({ category: 'social-media', link: 'https://discord.com/app', name: 'Discord' });
addBookmark({ category: 'social-media', link: 'https://reddit.com', name: 'Reddit' });
addBookmark({ category: 'multimedia', link: 'https://netflix.com', name: 'Netflix' });
addBookmark({ category: 'multimedia', link: 'https://youtube.com', name: 'YouTube' });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsU0FBUyxDQUFDLEdBQVcsRUFBRSxHQUFXO0lBQ3ZDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7QUFDeEQsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFJLEtBQVU7SUFDekIsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQzNCLENBQUM7QUFFRDs7OztFQUlFO0FBQ0YsU0FBUyxNQUFNLENBQUMsR0FBUTtJQUFSLG9CQUFBLEVBQUEsUUFBUTtJQUNwQixJQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFDOUIsMkVBQTJFO0lBQzNFLFFBQVE7SUFDUixLQUFLLElBQUksUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRTtRQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNqRCw0RUFBNEU7SUFDNUUsUUFBUTtJQUNSLEtBQUssSUFBSSxRQUFRLEdBQUcsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFO1FBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2pELEtBQUssSUFB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