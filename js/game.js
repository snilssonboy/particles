var time = 0;

$(function() {
        $(".dial").knob();
        console.log("test");
});

setInterval(function(){ 
	if(time < 100){
		time += 0.1;
	}else{
		time = 0;
	}

 	$(".dial")
 		.val(time)
        		.trigger('change');

 }, 10);