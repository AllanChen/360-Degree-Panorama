// Garden Gnome Software - Skin
// Pano2VR 3.1.2/1855
// Filename: html5-logo&contrl.ggsk
// Generated 周一 六月 25 10:12:35 2012

function pano2vrSkin(player,base) {
	var me=this;
	var flag=false;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=new Array();
	this.elementMouseOver=new Array();
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	for(i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
			domTransition=prefixes[i] + 'Transition';
			domTransform=prefixes[i] + 'Transform';
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=new Array();
		stack.push(startElement);
		while(stack.length>0) {
			e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		return 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
	}
	
	this.findElements=function(id,regex) {
		var r=new Array();
		var stack=new Array();
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		this.__143=document.createElement('div');
		this.__143.ggId='\u56fe\u7247 143'
		this.__143.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__143.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 3px;';
		hs+='top:  3px;';
		hs+='width: 270px;';
		hs+='height: 61px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this.__143.setAttribute('style',hs);
		this.__143__img=document.createElement('img');
		this.__143__img.setAttribute('src',basePath + 'images/_143.png');
		this.__143__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this.__143__img);
		this.__143.appendChild(this.__143__img);
		this.divSkin.appendChild(this.__143);
		this._container_11=document.createElement('div');
		this._container_11.ggId='Container 11'
		this._container_11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._container_11.ggVisible=true;
		this._container_11.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-193 + w/2) + 'px';
				h=this.parentNode.offsetHeight;
				this.style.top=(-80 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -193px;';
		hs+='top:  -80px;';
		hs+='width: 288px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._container_11.setAttribute('style',hs);
		this._move_right=document.createElement('div');
		this._move_right.ggId='move_right'
		this._move_right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._move_right.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 328px;';
		hs+='top:  0px;';
		hs+='width: 48px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._move_right.setAttribute('style',hs);
		this._move_right__img=document.createElement('img');
		this._move_right__img.setAttribute('src',basePath + 'images/move_right.png');
		this._move_right__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this._move_right__img);
		this._move_right.appendChild(this._move_right__img);
		this._move_right.onmouseout=function () {
			me.elementMouseDown['move_right']=false;
		}
		this._move_right.onmousedown=function () {
			me.elementMouseDown['move_right']=true;
		}
		this._move_right.onmouseup=function () {
			me.elementMouseDown['move_right']=false;
		}
		this._move_right.ontouchend=function () {
			me.elementMouseDown['move_right']=false;
		}
		this._container_11.appendChild(this._move_right);
		this._move_left=document.createElement('div');
		this._move_left.ggId='move_left'
		this._move_left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._move_left.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 278px;';
		hs+='top:  0px;';
		hs+='width: 48px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._move_left.setAttribute('style',hs);
		this._move_left__img=document.createElement('img');
		this._move_left__img.setAttribute('src',basePath + 'images/move_left.png');
		this._move_left__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this._move_left__img);
		this._move_left.appendChild(this._move_left__img);
		this._move_left.onmouseout=function () {
			me.elementMouseDown['move_left']=false;
		}
		this._move_left.onmousedown=function () {
			me.elementMouseDown['move_left']=true;
		}
		this._move_left.onmouseup=function () {
			me.elementMouseDown['move_left']=false;
		}
		this._move_left.ontouchend=function () {
			me.elementMouseDown['move_left']=false;
		}
		this._container_11.appendChild(this._move_left);
		this._move_up=document.createElement('div');
		this._move_up.ggId='move_up'
		this._move_up.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._move_up.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 228px;';
		hs+='top:  0px;';
		hs+='width: 48px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._move_up.setAttribute('style',hs);
		this._move_up__img=document.createElement('img');
		this._move_up__img.setAttribute('src',basePath + 'images/move_up.png');
		this._move_up__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this._move_up__img);
		this._move_up.appendChild(this._move_up__img);
		this._move_up.onmouseout=function () {
			me.elementMouseDown['move_up']=false;
		}
		this._move_up.onmousedown=function () {
			me.elementMouseDown['move_up']=true;
		}
		this._move_up.onmouseup=function () {
			me.elementMouseDown['move_up']=false;
		}
		this._move_up.ontouchend=function () {
			me.elementMouseDown['move_up']=false;
		}
		this._container_11.appendChild(this._move_up);
		this._move_down=document.createElement('div');
		this._move_down.ggId='move_down'
		this._move_down.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._move_down.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 178px;';
		hs+='top:  0px;';
		hs+='width: 48px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._move_down.setAttribute('style',hs);
		this._move_down__img=document.createElement('img');
		this._move_down__img.setAttribute('src',basePath + 'images/move_down.png');
		this._move_down__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this._move_down__img);
		this._move_down.appendChild(this._move_down__img);
		this._move_down.onmouseout=function () {
			me.elementMouseDown['move_down']=false;
		}
		this._move_down.onmousedown=function () {
			me.elementMouseDown['move_down']=true;
		}
		this._move_down.onmouseup=function () {
			me.elementMouseDown['move_down']=false;
		}
		this._move_down.ontouchend=function () {
			me.elementMouseDown['move_down']=false;
		}
		this._container_11.appendChild(this._move_down);
		this._zoom_in=document.createElement('div');
		this._zoom_in.ggId='zoom_in'
		this._zoom_in.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoom_in.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 128px;';
		hs+='top:  0px;';
		hs+='width: 48px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoom_in.setAttribute('style',hs);
		this._zoom_in__img=document.createElement('img');
		this._zoom_in__img.setAttribute('src',basePath + 'images/zoom_in.png');
		this._zoom_in__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this._zoom_in__img);
		this._zoom_in.appendChild(this._zoom_in__img);
		this._zoom_in.onmouseout=function () {
			me.elementMouseDown['zoom_in']=false;
		}
		this._zoom_in.onmousedown=function () {
			me.elementMouseDown['zoom_in']=true;
		}
		this._zoom_in.onmouseup=function () {
			me.elementMouseDown['zoom_in']=false;
		}
		this._zoom_in.ontouchend=function () {
			me.elementMouseDown['zoom_in']=false;
		}
		this._container_11.appendChild(this._zoom_in);
		this._zoom_out=document.createElement('div');
		this._zoom_out.ggId='zoom_out'
		this._zoom_out.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoom_out.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 78px;';
		hs+='top:  0px;';
		hs+='width: 48px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoom_out.setAttribute('style',hs);
		this._zoom_out__img=document.createElement('img');
		this._zoom_out__img.setAttribute('src',basePath + 'images/zoom_out.png');
		this._zoom_out__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this._zoom_out__img);
		this._zoom_out.appendChild(this._zoom_out__img);
		this._zoom_out.onmouseout=function () {
			me.elementMouseDown['zoom_out']=false;
		}
		this._zoom_out.onmousedown=function () {
			me.elementMouseDown['zoom_out']=true;
		}
		this._zoom_out.onmouseup=function () {
			me.elementMouseDown['zoom_out']=false;
		}
		this._zoom_out.ontouchend=function () {
			me.elementMouseDown['zoom_out']=false;
		}
		this._container_11.appendChild(this._zoom_out);
		this._reset_view=document.createElement('div');
		this._reset_view.ggId='reset_view'
		this._reset_view.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._reset_view.ggVisible=true;
		hs ='position:absolute;';
		hs+='left: 28px;';
		hs+='top:  0px;';
		hs+='width: 48px;';
		hs+='height: 96px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._reset_view.setAttribute('style',hs);
		this._reset_view__img=document.createElement('img');
		this._reset_view__img.setAttribute('src',basePath + 'images/reset_view.png');
		this._reset_view__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
		me.player.checkLoaded.push(this._reset_view__img);
		this._reset_view.appendChild(this._reset_view__img);
		this._reset_view.onclick=function () {
			me.player.moveToDefaultView(2);
		}
		this._container_11.appendChild(this._reset_view);
		this.divSkin.appendChild(this._container_11);
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
		}
		this.divSkin.ggReLoaded=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		if (me.elementMouseDown['move_right']) {
			me.player.changePan(-1.5,true);
		}
		if (me.elementMouseDown['move_left']) {
			me.player.changePan(1.5,true);
		}
		if (me.elementMouseDown['move_up']) {
			me.player.changeTilt(1,true);
		}
		if (me.elementMouseDown['move_down']) {
			me.player.changeTilt(-1,true);
		}
		if (me.elementMouseDown['zoom_in']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoom_out']) {
			me.player.changeFovLog(1,true);
		}
	};
	this.addSkin();
};