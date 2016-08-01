var json={
	mail:	/^\w+@[a-zA-Z0-9]+\.[a-z]{2,3}(\.[a-z]{2})?$/,
	tel:	/^(0[1-9]\d{1,2}-)?[1-9]\d{6,7}$/,
	age:	/^(1[8-9]|[2-9]\d|100)$/,	//18-19  , 20-99 ,100
	user:	/^[\u4e00-\u9fa5]+$/,	//18-19  , 20-99 ,100
	xx:		/^xx$/,
	pass1:	/^.{6,}$/,
	pass2:	/^.{6,}$/,
	mobile:	/^1[3-8]\d{9}$/,
	id:		/^([1-6]\d{16}[0-9x]|[1-6]\d{14})$/,
	ip:/^(1\d\d|2[0-4]\d|25[0-5])\.(1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/
			
	
}

	
	
function checkForm(id,fn){
	var oForm=document.getElementById(id);
	var aIpt=oForm.getElementsByTagName('input');

	oForm.onsubmit=function(){
		var bOk=true;
		for(var i=0;i<aIpt.length;i++){
			if(aIpt[i].name){//排除submit按钮
				if(!check(aIpt[i])){
					bOk=false;	
				}
			}
		}
		if(bOk==false){
			return false;	
		}
	};
	
	function check(obj){
		if(json[obj.name]){
			//所有对象的1次校验
			if(!json[obj.name].test(obj.value)){
				obj.className='error';//1次校验失败
				return false;
			}else{
				//1次校验成功
				if(obj.name=='pass2'){//是要做2次校验的
					if(fn && fn(obj)==false){
						//2次失败	
						obj.className='error';
						return false;
					}else{
						//2次校验成功	
						obj.className='ok';
						return true;
					}
				}else{//不需要做
					obj.className='ok';//1成功，不要2次校验
					return true;
				}
			}
		}else{
			return true;	
		}
			
	}
	
	for(var i=0;i<aIpt.length;i++){
		if(aIpt[i].name){
			aIpt[i].onblur=function(){
				//只在做变红，绿	
				check(this);
			};	
		}
	}
};