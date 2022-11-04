let url="/api/devices_type";
let fila, id, nombre, descripcion
if(window.location.hostname=="dev.cdssoftware.com.ar")
  url="/moron-am"+url

window.onload=function() {

table = $('#devices_type').DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    },
    ajax: {
    url: url,
    },
    columns: [
        { data: 'id'},
        { data: 'nombre' },
        { data: 'descripcion' },
        {defaultContent: "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar' data-bs-toggle='tooltip' data-bs-placement='top' title='Editar'><i class='bi bi-pencil text-white'></i></button><button class='btn btn-danger btn-sm btnBorrar' data-bs-toggle='tooltip' data-bs-placement='top' title='Eliminar'><i class='bi bi-trash'></i></button></div></div>"}
        ]
    });

    
        //Crear
  $("#btnCrear").click(function(){

    opcion="crear";
    $("#formDispositivos").trigger("reset");
    $(".modal-header").css( "background-color", "#157347");
    $(".modal-header").css( "color", "white" );
    $(".modal-title").text("Crear Dispositivo");
    $('#modalCRUD').modal('show');
  })

  //Editar
  $(document).on("click", ".btnEditar", function(){	

    opcion='editar';
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());	   
    nombre = fila.find('td:eq(1)').text();
    descripcion = fila.find('td:eq(2)').text();
    $('#id').val(id);
    $("#nombre").val(nombre);  
    $("#descripcion").val(descripcion);          
    $(".modal-header").css("background-color", "#31d2f2");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Dispositivo");		
    $('#modalCRUD').modal('show');		   
});

     //BORRAR
     $(document).on("click", ".btnBorrar", function(){
      fila = $(this);           
      id = parseInt($(this).closest('tr').find('td:eq(0)').text());            
      Swal.fire({
          title: '¿Confirma eliminar el dispositivo?',                
          showCancelButton: true,
          confirmButtonText: `Confirmar`,                
          }).then((result) => {               
          if (result.isConfirmed) {
              $.ajax({
                  url: url+"/"+id,
                  method: 'delete',                        
                  data:  {id:id},    
                  success: function() {
                      table.row(fila.parents('tr')).remove().draw();                  
                  }
              });
              Swal.fire('Dispositivo Eliminado!', '', 'success')
          } 
          })
  }); 
  
  //submit editar y crear
  $('#formDispositivos').submit(function(e){                                     
    e.preventDefault();
    id = $.trim($('#id').val());    
    nombre = $.trim($('#nombre').val());
    descripcion= $.trim($('#descripcion').val())

    if(opcion=='crear'){                
        $.ajax({                    
            url: url,
            method: 'post',                                                         
            contentType: 'application/json',  
            data:  JSON.stringify({
              nombre:nombre, 
              descripcion:descripcion}),                       
            success: function(data) {                       
                table.ajax.reload(null, false);                        
            }
        });	
    }
    if(opcion=='editar'){
        $.ajax({                    
            url: url+"/"+id,
            method: 'put',                                        
            contentType: 'application/json',  
            data:  JSON.stringify({id:id, 
            nombre:nombre, 
            descripcion:descripcion}),                       
            success: function(data) {                       
               table.ajax.reload(null, false);                        
            }
        });	
    }        		        
    $('#modalCRUD').modal('hide');											     			
});




};
