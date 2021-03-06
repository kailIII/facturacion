 $(function(){
	interaccionPlantilla();
	ajaxFunctions();
	$('#tfacturar, #tsuscriptor').DataTable({
            "language": {
               	"url": "Spanish.json"
				
             }

            });
});
 var mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
;
function interaccionPlantilla()
{
	$('[data-toggle="popover"]').popover()
	$('[data-toggle="tooltip"]').tooltip()
	$(".navegacion").hide();
	$(".principal").hide();
	$(".esconde").hide();

	$("#modificarEmpresa, #modificarRepresentante").hide();

	$("#me").on('click',function(){
		$('#tabla1').hide();
		$(this).hide();
		$('#modificarEmpresa').fadeIn();
	});
    
	$("#mr").on('click',function(){
		$('#tabla2').hide();
		$(this).hide();
		$('#modificarRepresentante').fadeIn();
	});


	$("#suscriptores, #facturacion,#estadisticas,#configuracion,#empresa,#manual").on('click',function(){
		if(!this)$(".navegacion").slideUp(300);
		$(this).siblings(".navegacion").slideToggle(300);
	});

	$(".formatoFecha").each(function(indice){
		$(this).text(" "+(mes[new Date($(this).text()).getMonth()])+" "+( new Date($(this).text()).getDate()) +" de "+ (new Date($(this).text()).getYear() + 1900));
	});
	$(".formatoFecha2").each(function(indice){
		var yyyy = (new Date($(this).val()).getYear() + 1900);
		var m = (new Date($(this).val()).getMonth() + 1) < 10? "0"+(new Date($(this).val()).getMonth() + 1):(new Date($(this).val()).getMonth() + 1);
		var dd = (new Date($(this).val()).getDate()) < 10? "0"+(new Date($(this).val()).getDate()):(new Date($(this).val()).getDate());
		$(this).val(yyyy+"-"+m+"-"+dd);
	});


 	$('body').on('change','.checkmedidor',function(){
		if($(this).prop('checked')) $('#infoMedidor input').prop('disabled',false);
		else $('#infoMedidor input').prop('disabled',true);
 	});
}

function ajaxFunctions()
{
	$('body').on('change','.SelDepartamento',function(){
		var url = $(this).parents('form').attr('action');
		console.log(url);
		var seleccion = $(this).val();
		ajaxMunicipio(url,seleccion);
	});

	$('body').on('change','.SelRegion',function(){
		var url = $(this).parents('form').attr('action');
		var seleccion = $(this).val();
		ajaxTarifa(url,seleccion);
	});

	$('body').on('change','#existeUsuario',function(){
		ajaxUsuarios($(this).val());
	});

	$('body').on('change','#existeSuscriptor',function(){
		ajaxTitular($(this).val());
	});

	$("body").on('change','.check',function(){
		$(this).parent().siblings('.col-md-6').children().slideToggle();
	});

	$("body").on('change','.ch',function(){
       ajaxSuscripcion($(this).val(),$(this).attr('data-route'),$(this).attr('data-alert'))
       $(this).attr('data-alert')
	});

	$("body").on('change','.igac',function(){
		var con=[],route;
		$('.igac').each(function(i){
			if($('.igac').eq(i).val() == '') return false;
			con[i] = $('.igac').eq(i).val();
			route = $(this).closest('tr').attr('data-route');
		});

		if(con.length == 5) ajaxNopredial(con, route);
	});

}

function ajaxMunicipio(url,val)
{
	$.ajax({
		type: 'GET',
		url: url,
		data: {Dep:val},
		async: false,
		success: function(e)
		{
			$("#campoMunicipios").load(location.href + " #campoMunicipios");
		}
	});
}

function ajaxTarifa(url,val)
{
	$.ajax({
		type: 'GET',
		url: url,
		data: {Tar:val},
		async: false,
		success: function(e)
		{
			$("#campoTarifas").load(location.href + " #campoTarifas");
		}
	});
}


function ajaxUsuarios(par)
{
	$.ajax({
		type:'GET',
		url:'/viewUser/addUsers',
		data:{Usr:par},
		async: false,
		success:function(e)
		{
			$("#thUser").load(location.href+ " #thUser>tr");
		}
	});
}

function ajaxTitular(par)
{
	$.ajax({
		type:'GET',
		url:'/viewSuscriptor/addSuscriptor',
		data:{Tit:par},
		async: false,
		success:function(e)
		{
			$("#thUser").load(location.href+ " #thUser>tr");
		}
	});
}

function ajaxSuscripcion(par,route,element)
{

	$.ajax({
		type:'GET',
		url:route,
		data:{Sus:par},
		async: false,
		success:function(e)
		{
			$("#"+element).load(location.href+ " #"+element);
		}
	});
}

function ajaxNopredial(par,route)
{
	console.log(par+' '+route);
	$.ajax({
		type:'GET',
		url:route,
		data:{Zi:par[0],
			  Si:par[1],
			  Mi:par[2],
			  Ci:par[3],
			  Ni:par[4]
			 },
		async: false,
		success:function(e)
		{
			$("#alert3").load(location.href+ " #alert3");
		}
	});
}