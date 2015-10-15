;window.onload = function(){
	try{
		nzoom.init();
	}catch(e){
		console.log(e);
	}
}

var nzoom = (function(){

	var body = document.getElementsByTagName('body')[0],
		wZoom = document.getElementById('w-nzoom'),
		img = wZoom.getElementsByTagName('img')[0],
		imgOffsetTop = 0,
		imgMaxWidth = 0,
		transDuration = '',

	getTransitionName = function(){
		var el = document.createElement('div'),
				transEndEventNames = {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition	: 'transitionend',
					OTransition 	: 'oTransitionEnd otransitionend',
					transition      : 'transitionend'
				};
		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return transEndEventNames[name];
			}
		}

		return false;
	},
	zoom = function(el) {
		var	src = el.getAttribute('src'),
			nZoomClasses = wZoom.className.trim().split(' '),
			bodyClasses = body.className.split(' '),
			bodyMarginComputedStyle = getComputedStyle(body).getPropertyValue('margin').split(' '),
			bodyPaddingComputedStyle = getComputedStyle(body).getPropertyValue('padding').split(' '),
			bodyPermaWidth = body.offsetWidth;

			body.style.width = bodyPermaWidth + 'px';
			wZoom.style.top = body.scrollTop + 'px';
			wZoom.style.bottom = body.scrollTop * -1 + 'px';
			
		if(nZoomClasses.indexOf('nzoomed') === -1) {

			wZoom.className = wZoom.className.trim()+(nZoomClasses.length > 0 ?' ':'')+ 'nzoomed';

			var imgChecker = new Image();

			imgChecker.onload = function(){
				if(bodyClasses.indexOf('nzoomed') === -1) {
					body.className = body.className + 'nzoomed';
					body.className = body.className + ' nhidden';
				}
				img.setAttribute('src', src);
				img.style.transition = 'all ' + ((!!transDuration) ? transDuration: '1s');
				img.style.maxWidth = (imgMaxWidth !== 0) ? (imgMaxWidth > imgChecker.width) ? imgChecker.width+'px': imgMaxWidth+'px': imgChecker.width+'px';
				img.style.maxHeight = imgChecker.height+'px';
			};
			imgChecker.src = src;
		}
	},
	render = function(imgs, wNZoom, wNZoomImg) {
		
		wNZoom.addEventListener('click', function(event) {
			var classes = wZoom.className.split(' '),
				bodyClasses = body.className.split(' ');

			if(classes.indexOf('nzoomed') !== -1) {

				classes.splice(classes.indexOf('nzoomed'), 1);
				bodyClasses.splice(bodyClasses.indexOf('nzoomed'), 1);
				bodyClasses.splice(bodyClasses.indexOf('nhidden'), 1);

				wZoom.className = classes.toString();
				body.className = bodyClasses.toString();
				img.setAttribute('src', 'images/default.gif');
				body.style.width = '';
				img.style.transition = 'all 0s';
				img.style.maxWidth = '';
				img.style.maxHeight = '';
				img.style.margin = '';
			}
		});

		wNZoomImg.onclick = function() {
			event.stopPropagation();
		}

		var j = 0;
		wNZoomImg.addEventListener(getTransitionName(), function(event){
			if (j === 0) {
				if (img.offsetTop < 0) {
					imgOffsetTop = Math.abs(img.offsetTop);
					img.style.margin = '100px auto';
					wNZoom.scrollTop = imgOffsetTop+100;
				}
				j = 1;
			} else {
				j = 0;
			}
		});

		for(var i = 0, len = imgs.length; i < len; i++) {
			if(imgs[i].dataset.nzoom == undefined){
				imgs[i].setAttribute('data-nzoom', 1);
				imgs[i].addEventListener('click', function(event) {
					checkListeners();
					zoom(this);
				});
			}
		}
	},
	checkListeners = function() {
		var imgs = document.getElementsByClassName('nzoom-img');
		for(var i = 0, len = imgs.length; i < len; i++) {
			if(imgs[i].dataset.nzoom == undefined){
				imgs[i].setAttribute('data-nzoom', 1);
				imgs[i].addEventListener('click', function(event) {
					zoom(this);
				});
			}
		}
	},
	setMaxWidth = function (width) {
		if(!isNaN(width)) {
			imgMaxWidth = width;
		}
	},
	setTransDuration = function(duration) {
		if(!isNaN(duration)) {
			transDuration = duration + 's';
		}
	};
	return {
		init: function() {
			var imgs = document.getElementsByClassName('nzoom-img'),
				wNZoom = document.getElementById('w-nzoom'),
				wNZoomImg = wNZoom.getElementsByTagName('img')[0];
			render(imgs, wNZoom, wNZoomImg);
		},
		setMaxWidth: function(width) {
			setMaxWidth(width);
		},
		setTransDuration: function(duration) {
			setTransDuration(duration);
		},
		options: function(option){
			
			var optionLen = Object.keys(option).length,
				optionKeys = Object.keys(option),
				optionValues = Object.keys(option).map(function(k) { return option[k]}),
				i = 0;

			for(i; i < optionLen; i++) {
				nzoom[optionKeys[i]](optionValues[i]);
			}
		}
	};
	
})();