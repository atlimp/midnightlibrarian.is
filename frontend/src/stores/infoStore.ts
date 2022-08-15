import type { Config, DateOfInterest, Link, Member, Release } from "$lib/interfaces";
import { shuffleArray } from "$lib/util";

const BASE_API_URL = 'https://midnightlibrarian.is/api';

export const fetchConfig = async (fetch): Promise<Config> => {
    const requestUrl = `${BASE_API_URL}/config`;
    const data = await (await fetch(requestUrl)).json();
    return {
        showAdditionalContent: data.showAdditionalContent,
        messageOfTheDay: data.motd,
        dateOfInterest: {
            message: data.doi.message,
            date: data.doi.date ? new Date(data.doi.date) : new Date(),
            countdown: data.doi.countdown
        } as DateOfInterest
    } as Config;
}

export const fetchLinks = async (fetch): Promise<Link[]> => {
    const requestUrl = `${BASE_API_URL}/links/active`;
    const data = await (await fetch(requestUrl)).json();
    let result: Link[] = [];
    for (const link of data) {
        result.push(link as Link);
    }
    return result;
}

export const fetchQuote = async (fetch): Promise<string> => {
    const requestUrl = `${BASE_API_URL}/quote/random`;
    const data = await (await fetch(requestUrl)).json();
    return data.quote;
}

export const fetchReleases = async (fetch): Promise<Release[]> => {
    const requestUrl = `${BASE_API_URL}/releases/active`;
    const data = await (await fetch(requestUrl)).json();
    let result: Release[] = [];
    for (const release of data) {
        release.releaseDate = new Date(release.releaseDate);
        result.push(release as Release);
    }
    return result.sort((a, b) => {
        return b.releaseDate.valueOf() - a.releaseDate.valueOf();
    })
}

export const fetchMembers = async (fetch): Promise<Member[]> => {
    const requestUrl = `${BASE_API_URL}/members`;
    const data = await (await fetch(requestUrl)).json();
    let result: Member[] = [];
    for (const member of data) {
        result.push(member as Member);
    }
    shuffleArray(result);
    return result;
}
