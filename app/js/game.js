var tick = new Date();
var working = false;
var dialTime = 0;
var d = new Date();
var t = d.getTime();


var Building = function(BASECOST, COST, INCOME, COUNT, TICKTIME, TICKLENGTH, ACTIVE, TIMELEFT){

	this.baseCost = BASECOST;
	this.cost = COST;
	this.income = INCOME;
	this.count = COUNT;
	this.tickLength = TICKLENGTH;
	this.tickTime = TICKTIME;
	this.active = ACTIVE;
	this.timeLeft = TIMELEFT;
}

var buildings = [
	new Building(10.00,10.00,1.00,0,0,1000,false, 0),
	new Building(20.00,20.00,2.00,0,0,2000,false, 0),
	new Building(30.00,30.00,3.00,0,0,3000,false, 0),
	new Building(40.00,40.00,4.00,0,0,4000,false, 0),
	new Building(50.00,50.00,5.00,0,0,5000,false, 0),
	new Building(60.00,60.00,6.00,0,0,6000,false, 0),
	new Building(70.00,70.00,7.00,0,0,7000,false, 0),
	new Building(80.00,80.00,8.00,0,0,8000,false, 0),
	new Building(90.00,90.00,9.00,0,0,9000,false, 0),
	new Building(100.00,100.00,10.00,0,0,10000,false, 0)
];

setInterval(function(){ 
	if(dialTime < 100){
		dialTime += 0.1;
	}else{
		dialTime = 0;
	}

 	$(".dial")
 		.val(dialTime)
        		.trigger('change');

 }, 100);

$(function(){ 
     var navMain = $("#navcoll");
     navMain.on("click", "a", null, function () {
         navMain.collapse('hide');
     });
 });

var UpdateEverything = function(){
	for(var i = 0; i < buildings.length; i++){
		if(buildings[i].active){
			$('#building' + (i+1)+ ' > .card-content > .progress > .progress-bar-custom').width((buildings[i].timeLeft / buildings[i].tickLength) * 100 + '%');
			$('#building' + (i+1) + ' > .card-content > .progress > .progress-bar-custom').html((buildings[i].timeLeft / 1000).toFixed(1) + ' sec');
		}else{
			$('#building' + (i+1)+ ' > .card-content > .progress > .progress-bar-custom').width((buildings[i].timeLeft / buildings[i].tickLength) * 100 + '%');
			$('#building' + (i+1) + ' > .card-content > .progress > .progress-bar-custom').html((buildings[i].tickLength / 1000).toFixed(1) + ' sec');
		}
	}
}

var tickCycle = setInterval(cycleTimer, 10);

function StartBuilding(x){
	if(!buildings[x - 1].active){
		buildings[x - 1].active = true;	
		buildings[x - 1].tickTime = new Date().getTime();
		console.log("Started building " + (x-1) + " on tick " + buildings[x - 1].tickTime);
	}
	event.stopPropagation? event.stopPropagation() : event.cancelBubble = true;
}

function cycleTimer(){
	d = new Date();
	t = d.getTime();

	_.forEach(buildings, function(value, key){

		if(value.active){
			value.timeLeft = Math.max(0, Math.min(((value.tickTime + value.tickLength) - t), value.tickLength));

			if(((value.tickTime + value.tickLength) - t) < 0){
				value.active = false;
			}
		}
	});

	UpdateEverything();
}