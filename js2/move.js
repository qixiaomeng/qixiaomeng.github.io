
define(function(require,exports,module){
	var getStyle=require('common.js').getStyle;
	exports.move=function(obj,json,opational){
		//1.整理optional
		opational	=	opational || {};
		opational.time = opational.time || 300;
		opational.type = opational.type || 'ease-out';
		
		//2.准备start/dis/count/n
		var start={};
		var dis={};
		for(var key in json){
			start[key] = parseFloat(getStyle(obj,key));
			dis[key] = json[key]-start[key];	
		}
		var count=Math.round(opational.time/30);
		var n=0;
		//3.关，开定时器	
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			
			for(var key in json){
				//1.判断type,根据type整理cur
				switch(opational.type){
					case 'linear':
						var a=n/count;
						var cur=start[key]+dis[key]*a;
						break;	
					case 'ease-in':
						var a=n/count;
						var cur=start[key]+dis[key]*(a*a*a);
						break;	
					case 'ease-out':
						var a=1-n/count;
						var cur=start[key]+dis[key]*(1-a*a*a);
						break;	
				}
				//2.写入css
				if(key=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';	
				}else{
					obj.style[key]=cur+'px';	
				}
			}
			
			if(n==count){
				clearInterval(obj.timer);
				opational.fn && opational.fn();	
			}
		},30);
		
		
	};	
});