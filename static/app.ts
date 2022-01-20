type Category = 'social-media' | 'bookmarks' | 'multimedia';

function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}

function choice<T>(array: T[]) {
    let chosenidx = randomInt(0, array.length);
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

    const bookmarkElem = document.getElementById(id) as HTMLLIElement;
    bookmarkElem.addEventListener('click', () => {
        const linkElem = bookmarkElem.querySelector('a') as HTMLAnchorElement;
        linkElem.click();
    });
    if (category === 'bookmarks') {
        bookmarkElem.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const menu = document.getElementById('context-menu') as HTMLUListElement;
            menu.style.left = `${e.clientX}px`;
            menu.style.top = `${e.clientY}px`;
            menu.style.display = 'block';

            function contextmenuOnClick(e) {
                const target = e.target as HTMLElement;
                if (target.classList.contains('delete')) {
                    bookmarkElem.remove(); // TODO: remove from local storage
                    menu.style.display = 'none';
                } else if (target.classList.contains('edit')) {
                    let newTitle = prompt('Enter new title', bookmarkElem.querySelector('a').innerText);
                    if (newTitle !== null) {
                        bookmarkElem.querySelector('a').innerText = newTitle;
                        menu.style.display = 'none';
                    }
                } else if (target.classList.contains('cancel')) {
                    menu.style.display = 'none';
                }
                menu.removeEventListener('click', contextmenuOnClick);
            }

            menu.addEventListener('click', contextmenuOnClick);

        });
    }
    return bookmarkElem
}

/**
 * This function format the string `fmt` in a manner similar to c's printf. 
 * @param fmt The string format, eg: Hello, %s! You are the %dth visitor.
 * @param args The arguments to be replaced in the format string.
 * @returns The formatted string.
 */
function sprintf(fmt: string, ...args: any[]): string {
    return fmt.replace(/%[sdf]/g, (match) => {
        switch (match) {
            case '%s':
                return args.shift();
            case '%d':
                return args.shift();
            case '%f':
                return args.shift();
        }
    });
}
/**
 * Set the time element to the the specified time. 
 * @param time The time to set the time element to.
*/
function setTime(time: Date | { hour: number; minute: number; }): void {
    let hour: number | string;
    let minute: number | string;
    if (time instanceof Date) {
        hour = time.getHours();
        minute = time.getMinutes();
    } else {
        ({ hour, minute } = time);
    }
    const timeElem = document.getElementById('time') as HTMLParagraphElement;
    if (minute < 10)
        minute = `0${minute}`; 
    timeElem.innerHTML = sprintf('%d<span class="blink">:</span>%d', hour, minute);
}
/**
 * Set the date element to the the specified date.
 * The formatted date should look like this: Lundi, 12 Janvier 2020<
 * @param date The date to set the date element to.
 */
function setDate(date: Date | { day: number; month: number; year: number; }): void {
    let day: number;
    let month: number;
    let year: number;
    if (date instanceof Date) {
        day = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
    } else {
        ({ day, month, year } = date);
    }
    const dateElem = document.getElementById('date') as HTMLParagraphElement;
    dateElem.innerHTML = sprintf('%s, %d %s %d',
        ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][new Date(year, month, day).getDay()],
        day,
        ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][month],
        year);
}

// Automatically set the time and date.
setTimeout(function () {
    setTime(new Date());
    setDate(new Date());
}, 1000);

// Append the default bookmarks
addBookmark({ category: 'social-media', link: 'https://instagram.com', name: 'Instagram' });
addBookmark({ category: 'social-media', link: 'https://discord.com/app', name: 'Discord' });
addBookmark({ category: 'social-media', link: 'https://reddit.com', name: 'Reddit' });
addBookmark({ category: 'multimedia', link: 'https://netflix.com', name: 'Netflix' });
addBookmark({ category: 'multimedia', link: 'https://youtube.com', name: 'YouTube' });
