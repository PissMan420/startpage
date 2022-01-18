type Category = 'social-media' | 'bookmarks' | 'multimedia';

function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}

function choice<T>(array: T[]) {
    let chosenidx = randomInt(0, array.length - 1);
    return array[chosenidx]
}

/**
* This function generated an `len` long random series of number
* @param len The lenght of the id to generate.
* @return The generated id.
*/
function randId(len = 12): string {
    const alphabet: string[] = [];
    // add all the numbers to the alphabet array by looping through ascii char 
    // code.
    for (let charcode = 48; charcode < 58; charcode++)
        alphabet.push(String.fromCharCode(charcode));
    // add all the alphabet to the alphabet array by looping through ascii char 
    // code.
    for (let charcode = 65; charcode <= 90; charcode++)
        alphabet.push(String.fromCharCode(charcode));
    for (let charcode = 65; charcode <= 90; charcode++)
        alphabet.push(String.fromCharCode(charcode).toLowerCase());
 
    let str = '';
    for (let _ = 0; _ < len; _++)
        str += choice(alphabet);
    return str;
}

/**
* Add a new link to one of the category. 
* @return The list element of the link category
*/
function addBookmark({ category, link, name, icon }: {
   category: Category;
   link: string;
   name: string;
   icon?: string;
}) {
    const id = randId(6);
    const categoryBtnList = document.getElementById(category).querySelector('ul') as HTMLUListElement;
    if (categoryBtnList === null)
        throw new ReferenceError('Could not find the unordered list element inside category children');
    let template = `<li id="${id}">`;
    template += `<a href="${link}">${name}</a>`;
    template += `<img src="/favicon/${new URL(link).hostname}"></img>`
    template += '</li>';

    categoryBtnList.insertAdjacentHTML('beforeend', template);
    return document.getElementById(id); 
}

namespace youtubePlayer {
    /**
     * Set the youtube player to play the video with the given id.
     * @param urlOrId The ID (something like this JBFT7w5RpQo) or the video link
     *   (example: https://www.youtube.com/watch?v=JBFT7w5RpQo) to set the video to.
     */
    function setVideo(urlOrId: string) {
        let id = '';
        try {
            id = new URL(urlOrId).searchParams.get('v');
        } catch {
            id = urlOrId;
        }
        const video = document.getElementById('youtube-player') as HTMLVideoElement;
        video.src = `https://www.youtube.com/embed/${id}`;
    }

    document.addEventListener('load', function(){
        setTimeout(() => setVideo('dQw4w9WgXcQ'), 6000)
    })
}

// Append the default bookmarks
addBookmark({ category: 'social-media', link: 'https://instagram.com', name: 'Instagram' });
addBookmark({ category: 'social-media', link: 'https://discord.com/app', name: 'Discord' });
addBookmark({ category: 'social-media', link: 'https://reddit.com', name: 'Reddit' });
addBookmark({ category: 'multimedia', link: 'https://netflix.com', name: 'Netflix' });
addBookmark({category: 'multimedia', link: 'https://youtube.com', name: 'YouTube' });
