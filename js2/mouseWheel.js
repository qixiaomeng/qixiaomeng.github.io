define(function(require,exports,module){
	var getByClass=require('common.js').getByClass;
	var move=require('move.js').move;
	exports.mouseWheel=function(sClass){
		var aWrap=getByClass(document,sClass);
		for	(var i=0;i<aWrap.length;i++){
			exports.drag(aWrap[i]);	
			exports.addMouseWheel(aWrap[i]);	
		}
	};	
	exports.drag=function(oWrap){
		var oBar=getByClass(oWrap,'rollBar')[0];
		var oUp=getByClass(oWrap,'rollBarUp')[0];
		var oDown=getByClass(oWrap,'rollBarDown')[0];
		var timer=null;
		oBar.onmousedown=function(ev){
			var e=ev||event;
			var disY=e.clientY-oBar.offsetTop;
			document.onmousemove=function(ev){
				var e=ev||event;
				var t=e.clientY-disY;//计算
				setPos(oWrap,t);
			};	
			document.onmouseup=function(){
				document.onmouseup=document.onmousemove=null;	
			};
			return false;
		};	
		oDown.onmousedown=function(){
			var t=oBar.offsetTop;
			timer=setInterval(function(){
				t+=10;
				setPos(oWrap,t);	
			},30);	
		};
		oDown.onmouseup=function(){
			clearInterval(timer);	
		};
		oUp.onmousedown=function(){
			var t=oBar.offsetTop;
			timer=setInterval(function(){
				t-=10;
				setPos(oWrap,t);	
			},30);	
		};
		oUp.onmouseup=function(){
			clearInterval(timer);	
		};
	};
	
	exports.addMouseWheel=function(oWrap){
		var oBar=getByClass(oWrap,'rollBar')[0];
		var firefox=navigator.userAgent.toLowerCase().indexOf('firefox');
		if(firefox!= -1){
			oWrap.addEventListener('DOMMouseScroll',fnWheel,false);
		}else{
			oWrap.onmousewheel=fnWheel;
		}
		
		function fnWheel(ev){
			var e=ev||event;	
			var down=false;
			if(e.wheelDelta){
				down=e.wheelDelta<0?true:false;	
			}else{
				down=e.detail>0?true:false;
			}
			
			var t=oBar.offsetTop;
			if(down){
				t+=10;
			}else{
				t-=10;
			}
			setPos(oWrap,t);
			e.preventDefault && e.preventDefault();
			return false;
		}
		
	};
	
	
	function setPos(oWrap,t){
		var oBar=getByClass(oWrap,'rollBar')[0];
		var oBarParent=getByClass(oWrap,'rollBox')[0];
		var oContent=getByClass(oWrap,'movieBox_msg')[0];
		var oUp=getByClass(oWrap,'rollBarUp')[0];
		var oDown=getByClass(oWrap,'rollBarDown')[0];

		//限定
		if(t<oUp.offsetHeight)t=oUp.offsetHeight;
		if(t>oBarParent.offsetHeight-oBar.offsetHeight-oDown.offsetHeight)
			t=oBarParent.offsetHeight-oBar.offsetHeight-oDown.offsetHeight;
		oBar.style.top=t+'px';//使用
		//控制内容
		var scale=oBar.offsetTop/(oBarParent.offsetHeight-oBar.offsetHeight-oDown.offsetHeight);
		//oContent.style.top=scale*(oWrap.offsetHeight-oContent.offsetHeight)+'px';//使用
		var pos=scale*(oWrap.offsetHeight-oContent.offsetHeight);
		//oContent.style.top=;//使用
		move(oContent,{top:pos},{time:500});
	}
	
});













