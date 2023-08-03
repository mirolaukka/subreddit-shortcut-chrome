// Copyright (c) 2023, Miro Laukka
// All rights reserved.

// This source code is licensed under MIT license found in the
// LICENSE file in the root directory of this source tree. 

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const url = new URL(details.url);
    const searchParams = new URLSearchParams(url.search);

    const query = searchParams.get("q"); // google, bing, duckduckgo, aol
    const alternativeQuery = searchParams.get("p"); // yahoo, fuck you yahoo

    const urlRegex = /^r\/\w+/;

    if (details.url.includes("reddit") || !(urlRegex.test(query) || urlRegex.test(alternativeQuery))) {
        return; // If the URL doesn't contain "reddit" or neither query nor alternativeQuery matches the regex, do nothing
    }

    const subreddit = (query && query.substring(2)) || (alternativeQuery && alternativeQuery.substring(2));

    if (subreddit) {
        const redirectUrl = `https://www.reddit.com/r/${subreddit}`;
        chrome.tabs.update(details.tabId, {
            url: redirectUrl
        });
    }
});