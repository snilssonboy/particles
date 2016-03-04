var dialTime = 0;
var money = 10;


var Building = function(NAME, BASECOST, COST, INCOME, COUNT, TICKTIME, TICKLENGTH, ACTIVE, TIMELEFT, ITEMDESCRIPTION){

	this.itemname = NAME;
	this.baseCost = BASECOST;
	this.cost = COST;
	this.income = INCOME;
	this.count = COUNT;
	this.tickLength = TICKLENGTH;
	this.tickTime = TICKTIME;
	this.active = ACTIVE;
	this.timeLeft = TIMELEFT;
	this.itemDesc = ITEMDESCRIPTION;
}

var buildings = [	//NAME 			//BS 		//C 		//INC 		//Count
	new Building("Planck Measure",		10.00,		10.00,		1.00,		0,	0,1000,false,0, "One"),
	new Building("Neutrino Boiler",		20.00,		20.00,		2.00,		0,	0,2000,false,0, "Two"),
	new Building("Top Quark Identifier",		30.00,		30.00,		3.00,		0,	0,3000,false,0, "Three"),
	new Building("Strange Quark Mixer",		40.00,		40.00,		4.00,		0,	0,4000,false,0, "Four"),
	new Building("Proton Neutralizer",		50.00,		50.00,		5.00,		0,	0,5000,false,0, "Five"),
	new Building("Electron Synthesizer",		60.00,		60.00,		6.00,		0,	0,6000,false,0, "Six"),
	new Building("Gamma Generator",		70.00,		70.00,		7.00,		0,	0,7000,false,0, "Seven"),
	new Building("Hydrogen Smasher",		80.00,		80.00,		8.00,		0,	0,8000,false,0, "Eight"),
	new Building("Carbon Collector",		90.00,		90.00,		9.00,		0,	0,9000,false,0, "Nine"),
	new Building("Particle Accelerator",		100.00,	100.00,	10.00,		0,	0,10000,false,0, "Ten")
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
	$('#moneydisplay').html('Money: ' + money +  '$');

	for(var i = 0; i < buildings.length; i++){
		if(buildings[i].active){
			$('#building' + (i+1)+ ' > .card-content > .progress > .progress-bar-custom').width((buildings[i].timeLeft / buildings[i].tickLength) * 100 + '%');
			$('#building' + (i+1) + ' > .card-content > .progress > .progress-bar-custom').html((buildings[i].timeLeft / 1000).toFixed(1) + ' sec');
			$('#building' + (i+1) + ' > .card-content > .card-title').html(buildings[i].itemname + " - " + buildings[i].count);
		}else{
			$('#building' + (i+1)+ ' > .card-content > .progress > .progress-bar-custom').width((buildings[i].timeLeft / buildings[i].tickLength) * 100 + '%');
			$('#building' + (i+1) + ' > .card-content > .progress > .progress-bar-custom').html((buildings[i].tickLength / 1000).toFixed(1) + ' sec');
			$('#building' + (i+1) + ' > .card-content > .card-title').html(buildings[i].itemname + " - " + buildings[i].count);
		}

		$('#building' + (i+1) + ' .card-content > #itemcost').html('Cost: ' + buildings[i].cost.toFixed(2) + '$');
		$('#building' + (i+1) + ' .card-content > #itemdesc').html('Building ' + buildings[i].itemDesc);

		if(buildings[i].count > 0){
			$('#building' + (i+1) + ' .card-content > #itemaward').html('Generate: ' + (buildings[i].income * buildings[i].count) + '$');
		}else{
			$('#building' + (i+1) + ' .card-content > #itemaward').html('Generate: ' + buildings[i].income + '$');
		}

		if(money >= buildings[i].cost){

		}
	}
}

var tickCycle = setInterval(cycleTimer, 10);

function StartBuilding(x){
	if(!buildings[x - 1].active && buildings[x - 1].count > 0){
		buildings[x - 1].active = true;	
		buildings[x - 1].tickTime = new Date().getTime();
		console.log("Started building " + (buildings[x-1].itemname) + " on tick " + buildings[x - 1].tickTime);
	}
	event.stopPropagation? event.stopPropagation() : event.cancelBubble = true;
}

function cycleTimer(){
	var d = new Date();
	var t = d.getTime();

	_.forEach(buildings, function(value, key){

		if(value.active){
			value.timeLeft = Math.max(0, Math.min(((value.tickTime + value.tickLength) - t), value.tickLength));

			if(((value.tickTime + value.tickLength) - t) < 0){
				value.active = false;
				console.log(value.itemname + ' finished');
				money += (value.income * value.count);
				UpdateEverything();
			}
		}
	});

	UpdateEverything();
}


function BuyItem(id, amount){
	console.log("Trying to buy " + amount + "x of " + buildings[id-1].itemname);
	if(amount == 1 && money >= buildings[id-1].cost){
		money -= buildings[id-1].cost;
		buildings[id-1].count++;
		buildings[id-1].cost = buildings[id-1].baseCost * Math.pow(1.15, buildings[id-1].count);
		console.log("Bought");
		UpdateEverything();
	}

	if(amount != 1){
		var thisItemBaseCost = buildings[id - 1].baseCost;
		var thisItemCount = buildings[id - 1].count;
		var totalCost = 0;

		for(var i = 0; i < amount; i++){
			totalCost = totalCost + (thisItemBaseCost * Math.pow(1.15, thisItemCount + i));
		}
		console.log(totalCost);

		if(money >= totalCost){
			money -= totalCost;
			buildings[id - 1].count += amount;
			buildings[id - 1].cost = buildings[id-1].baseCost * Math.pow(1.15, buildings[id-1].count);
			UpdateEverything();
		}
	}
}