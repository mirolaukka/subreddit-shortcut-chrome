chrome.webRequest.onBeforeRequest.addListener(
    callbackFunction, {
        urls: ['<all_urls>']
    },
    ['blocking']
);

function callbackFunction(details) {
    const url = new URL(details.url);
    const searchParams = new URLSearchParams(url.search);
    const query = searchParams.get("q");

    const urlRegex = /^r\/\w+/;

    if (!details.url.includes("reddit") && urlRegex.test(query)) {
        // Redirect to the subreddit
        const subreddit = query.substring(2); // Remove 'r/' from the query
        const redirectUrl = `https://www.reddit.com/r/${subreddit}`;

        return {
            redirectUrl: redirectUrl
        };
    }

    // If no redirection needed, return nothing or { cancel: false }
    // to allow the request to continue normally.
    return {
        cancel: false
    };
}