var time = 0;

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