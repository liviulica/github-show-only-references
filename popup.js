// Keep track if we've hidden some elements or not
var isHidden = false;

var prettify = {
	hideUselesItems: function() {
		$('.mini-discussion-bubble').hide();
		$('.discussion-bubble').not('.discussion-reference').not('.js-task-list-container').hide();
		$('.closed-banner').hide();
		isHidden = true;
	},

	showAllItems: function() {
		$('.mini-discussion-bubble').show();
		$('.discussion-bubble').not('.discussion-reference').not('.js-task-list-container').show();
		$('.closed-banner').show();
		isHidden = false;
	}
};


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (isHidden === false) {
		prettify.hideUselesItems();
	}
	else {
		prettify.showAllItems();
	}
	sendResponse({state: isHidden});
});