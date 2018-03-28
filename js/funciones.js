var locations=[],nombres_=[],promedio_=[],color_=[];

$(document).ready(function(){
  
	$(".progress").css("height","20px").hide();
	$("#dynamic").css("height","20px");
	
	$("#btn-mostrar").click(function(){
		$(".progress").show();
		var current_progress = 0;
  	    var interval = setInterval(function() { current_progress += 1;
      	$("#dynamic").css("width", current_progress + "%").attr("aria-valuenow", current_progress)
      	.text(current_progress + "% Complete");
      	if (current_progress >= 100)
          clearInterval(interval);
      	if(current_progress==100){
  		   $(".progress").hide();
  		   $("#dynamic").css("width","0%").attr("aria-valuenow",0);
  			$.ajax({
                // la URL para la petición
                url : 'https://www.datos.gov.co/resource/rzdg-k539.json?$limit=250',
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
					   tr.append("<td>" + json[i].numero_de_muestras + "</td>");
					   tr.append("<td>" + json[i].promedio_irca + "</td>");
             tr.append("<td>" + json[i].ano + "</td>");
					   tr.append("<td>" + json[i].municipio + "</td>");
					   tr.append("<td>"+json[i].departamento+"</td>");
             if(json[i].localizacion==null){
                tr.append("<td>Desconocida</td>");
              }else{
                tr.append("<td>("+json[i].localizacion.latitude+","+json[i].localizacion.longitude+")</td>");
                locations.push(["Promedio IRCA: "+json[i].promedio_irca,
                        json[i].localizacion.latitude,
                        json[i].localizacion.longitude,1]);
              }
					   $('#mostrar').append(tr);
						 //locations.push(["Promedio IRCA: "+field.promedio_irca,
                        //json[i].georeferenciaci_n.latitude,
                        //json[i].georeferenciaci_n.longitude,1]);
              nombres_.push("id: "+json[i].id);
              promedio_.push(json[i].promedio_irca);
              color_.push('rgba('+Math.round(Math.random()*255)+
                    ','+Math.round(Math.random()*255)+
                    ','+Math.round(Math.random()*255)+', 0.5)');        
				    
            }
            generarGrafica();
         // $("#mapa").attr("style","width: 100%; height: 400px;");
          $("#grafico").attr("style","width: 100%; height: 400px;");  

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

function generarGrafica(){
      var ctx = document.getElementById("grafico").getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: nombres_,
              datasets: [{
                  label: 'Promedio de citios bancarios',
                  data: promedio_,
                  backgroundColor: color_,
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
    }