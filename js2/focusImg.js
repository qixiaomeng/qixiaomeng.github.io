
define(function(require,exports,module){
	var getByClass=require('common.js').getByClass;
	var move=require('move.js').move;
	
	exports.focusImg=function(id){
		var oWrap=document.getElementById(id);
		var aHead=oWrap.children[1].getElementsByTagName('li');	
		var aContent=oWrap.children[0].getElementsByTagName('li');
		var oPoint=getByClass(oWrap,'fi_pointer')[0];
		oPoint.style.zIndex=99999999;
		var zIndex=1;
		for(var i=0;i<aHead.length;i++){
			(function(index){
				aHead[i].onclick=function(){
					for(var i=0;i<aHead.length;i++){
						move(aContent[i],{opacity:0});	
					}
					move(oPoint,{left:this.offsetLeft});
					move(aContent[index],{opacity:1});
					aContent[index].style.zIndex=zIndex++;	
				};	
				
			})(i);	
		}
	};	
});