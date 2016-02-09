var time = 0;
var tick = 0;
var tickLength = 10000;
var working = false;

setInterval(function(){ 
	if(time < 100){
		time += 0.1;
	}else{
		time = 0;
	}

 	$(".dial")
 		.val(time)
        		.trigger('change');

 }, 100);

$(function(){ 
     var navMain = $("#navcoll");
     navMain.on("click", "a", null, function () {
         navMain.collapse('hide');
     });
 });

var UpdateEverything = function(){
	$('#building1 > .card-content > .progress > .progress-bar-custom').width(((tick/tickLength) * 100).toFixed(2) + '%');
	$('#building1 > .card-content > .progress > .progress-bar-custom').html((10 - (tick / 1000)).toFixed(0) + ' sec');
}

var tickCycle = setInterval(cycleTimer, 10);

function StartBuilding(x){
	working = true;
}

function cycleTimer(){
	if(tick < tickLength && working){
		tick += 10;
	}else{
		tick = 0;
		working = false;
	}

	UpdateEverything();
}