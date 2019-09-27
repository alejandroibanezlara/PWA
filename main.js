//Service Worker

if('serviceWorker' in navigator){
	console.log('Puedes usar los serviceWorker en tu navegador');

	navigator.serviceWorker.register("./sw.js").then(res=>console.log("Service Worker cargado correctamente", res)).catch(err=>console.log("Service Worker NO se ha podido registrar", err))


}else{
	console.log('NO Puedes usar los serviceWorker en tu navegador');
}





//SCROLL SUAVIZADO
$(document).ready(function(){
	

	$("#menu a").click(function(e){

		e.preventDefault();

		console.log($('#footer').offset().top);

		$("html, body").animate({

			scrollTop: $($(this).attr('href')).offset().top

		});
		return false
	});
});