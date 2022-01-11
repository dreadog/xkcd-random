import { fetch } from '@forge/api';

const get_random_number = (min, max) => {
    [min, max] = [Number(min), Number(max)]
    return Math.round(Math.random() * (max-min)) + min
}

const load = async (url) => {
    let resp = await fetch(url);
    let text = await resp.text();
    return text
 }

const get_most_recent_id = async () => {
    let rss_feed = await load('https://xkcd.com/rss.xml');
    return Number(rss_feed.match(/https:\/\/xkcd.com\/(\d{4,5})/)[1]); //Capturing Route Id of latest item in feed
}
const random_url = async () => {
    let highest_id = await get_most_recent_id();
    console.log(`Highest ID: ${highest_id}`)
    return `https://xkcd.com/${get_random_number(1, highest_id)}`
}

const specific_url = (id) => {
    return `https://xkcd.com/${id}`
}

const parse_webpage = async (url) => {
    let id = url.match(/https:\/\/xkcd.com\/(\d{1,5})/)[1]
    let comic_page = await load(url);
    let image_url = comic_page.match(/<img src="(\/\/imgs.xkcd.com\/comics\/.*?[\.png|\.jpg|\.jpeg])"/)[1];
    let alt_text = comic_page.match(/<img src="\/\/imgs.xkcd.com\/comics\/.*?[\.png|\.jpg|\.jpeg]" .*? alt="(.*?)" .*/)[1];
    return {'src': `https:${image_url}`, 'alt': alt_text, 'url' : url, 'id': id }
} 

export const get_xkcd_image_url = async (selection) => {
    let url;
    if (selection) {
        if (selection.includes(',')) { //Check if selection contains more than one ID
            console.log(`Current Selection is: ${selection}`);
            selection = selection.split(','); //Make selection an array
            selection = selection[get_random_number(0, selection.length-1)]; //Retrieve random object
        }
        if (selection.includes('-')) { //Check if selection is range
            console.log(`Current Selection is: ${selection}`);
            let [min,max] = selection.split('-'); //Get range limits
            console.log(`Current Range is: ${min} - ${max}`);
            selection = get_random_number(min,max);
            console.log(`Current Selection is: ${selection}`);
         }
        url = specific_url(selection);
    } else {
        url = await random_url();
    }
    console.log(`Current URL is: ${url}`);
    return await parse_webpage(url)
}
