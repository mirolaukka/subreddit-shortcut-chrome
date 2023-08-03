chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Check if the URL has changed and extract the search query from the URL
    if (changeInfo.url) {
        const url = new URL(changeInfo.url);
        const searchParams = new URLSearchParams(url.search);
        const query = searchParams.get("q");
        console.log(query)
        // Check if the search query matches the 'r/subreddit' pattern
        const urlRegex = /^r\/\w+/;
        if (query && urlRegex.test(query)) {
            // Redirect to the subreddit URL
            const subreddit = query.replace(/^r\//, '');
            const redirectUrl = `https://www.reddit.com/r/${subreddit}/`;
            chrome.tabs.update(tabId, {
                url: redirectUrl
            });
        }
    }
});