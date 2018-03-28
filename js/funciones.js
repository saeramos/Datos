$(document).ready(function(){
	$(".progress").css("height","20px").hide();
	$("#dynamic").css("height","20px");
	
	$("#btn-mostrar").click(function(){
		$(".progress").show();
		var current_progress = 0;
  	    var interval = setInterval(function() { current_progress += 1;
      	$("#dynamic").css("width", current_progress + "%").attr("aria-valuenow", current_progress)
      	.text(current_progress + "% Complete");
      	if (current_progress >= 102)
          clearInterval(interval);
      	if(current_progress>100){
  		   $(".progress").hide();
  		   $("#dynamic").css("width","0%").attr("aria-valuenow",0);
  			$.ajax({
                // la URL para la petición
                url : 'https://www.datos.gov.co/resource/m5vp-ypu6.json',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                // código a ejecutar si la petición es satisfactoria;          
                success : function(json) {
                console.log('se ha realizado la petición');                           

                var tr;

				for (var i = 0; i < json.length; i++) {
					   tr = $('<tr>');
             tr.append("<td>"+(i+1)+"</td>");
					   tr.append("<td>" + json[i].entidad_bancaria + "</td>");
					   tr.append("<td>" + json[i].sitio_web + "</td>");
             tr.append("<td>" + json[i].direccion + "</td>");
					   tr.append("<td>" + json[i].telefono + "</td>");
					   tr.append("<td>"+json[i].georeferenciaci_n.coordinates+"</td>");
					$('#mostrar').append(tr);
						        
				    }  

               	},           
                // código a ejecutar si la petición falla;
                // son pasados como argumentos a la función
                // el objeto de la petición en crudo y código de estatus de la petición
                error : function(xhr, status) {
                    console.log('ha ocurrido un error');
                },
                     
                // código a ejecutar sin importar si la petición falló o no
                complete : function(xhr, status) {
                            
                }
                })}}, 60);
	});
});