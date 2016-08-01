
/*seajs.use([
	'tab.js',
	'focusImg.js'
],function(
	modTab,
	modFocus
){
	modTab.tabAll('movie_moreMsg');
	modFocus.focusImg('playerIndexFocus');	
});*/

define(function(require,exports,module){
	require('tab.js').tabAll('movie_moreMsg');	
	require('focusImg.js').focusImg('playerIndexFocus');
	require('mouseWheel.js').mouseWheel('scrWheel');
	//..
	//..
	//..	
});