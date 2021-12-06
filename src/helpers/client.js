import { fetch } from '@forge/api';

const random_url = (highest_id) => {
    return `https://xkcd.com/${Math.floor(Math.random() * highest_id) + 1}`
}

const load_xml = async (path) => {
   let resp = await fetch(path);
   let text = await resp.text();
   return text
}

const get_most_recent_id = async () => {
    let rss_feed = await load_xml('https://xkcd.com/rss.xml');
    return Number(rss_feed.match(/https:\/\/xkcd.com\/(\d{4,5})/)[1]); //Capturing Route Id of latest item in feed
}

const parse_random_webpage = async (most_recent) => {
    let comic_page = await load_xml(random_url(most_recent));
    let image_url = comic_page.match(/<img src="(\/\/imgs.xkcd.com\/comics\/.*?\.png)"/)[1];
    return image_url
} 

export const get_random_xkcd_url = async () => {
    let most_recent = await get_most_recent_id()
    return await parse_random_webpage(most_recent)
}
