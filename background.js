// Called when the url of a tab changes.
function showExtension(details) {
    chrome.pageAction.show(details.tabId);
    chrome.pageAction.setIcon({tabId: tab.id, path: 'icons/false.png'});
}

// Listen for any changes to the URL of any tab.
// In case we are on github - show the extension
URLS = [{hostSuffix: 'github.com'}] ;
chrome.webNavigation.onCompleted.addListener(showExtension, {url: URLS});

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendRequest(tab.id, { method: "getHTML"}, function(response) {
		// Change the icon from a plus to a minus and back again
		chrome.pageAction.setIcon({tabId: tab.id, path: 'icons/' + response.state + '.png'});

		// Change the title accordingly
		if (response.state === true) {
			chrome.pageAction.setTitle({tabId: tab.id, title: 'Show everything'});
		}
		else {
			chrome.pageAction.setTitle({tabId: tab.id, title: 'Show only references'});
		}
	});
});