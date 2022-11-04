let url="/api/devices";
if(window.location.hostname=="dev.cdssoftware.com.ar")
  url="/moron-am"+url

let fila, cuenta,codigos, nombre, telefono,contacto,direccion,ciudad,localidad,protocolo;
function Numeros(string){//Solo numeros
  var out = '';
  var filtro = '1234567890';//Caracteres validos
  
  //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos 
  for (var i=0; i<string.length; i++)
      if (filtro.indexOf(string.charAt(i)) != -1) 
           //Se añaden a la salida los caracteres validos
      out += string.charAt(i);
  
  //Retornar valor filtrado
  return out;
}


window.onload=function() {
  let inputCodigos= document.getElementById('codigos');  

    table = $('#dispositivos').DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
         ajax: {
           url:  url,
         },
         columns: [
          { data: 'cuenta'},
          { data: 'nombre'},
          { data: 'telefono' },
          { data: 'contacto' },
          { data: 'direccion' },
          { data: 'ciudad' },
          { data: 'localidad' },
          { data: 'protocolo'},
          { data: 'categoria'},
          { data: 'tipo'},
          {defaultContent: "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar' data-bs-toggle='tooltip' data-bs-placement='top' title='Editar'><i class='bi bi-pencil text-white'></i></button><button class='btn btn-danger btn-sm btnBorrar' data-bs-toggle='tooltip' data-bs-placement='top' title='Eliminar'><i class='bi bi-trash'></i></button></div></div>"}
        ]
      })


        //Crear
  $("#btnCrear").click(function(){
    let categoria = document.getElementById('categoria')
    let inputCuenta= document.getElementById('cuenta');  
    inputCuenta.disabled=false;
    inputCodigos.disabled=false;
    if(categoria.name == 'categoria'){
        devices_category();
    }
    let tipo = document.getElementById('tipo')

    if(tipo.name == 'tipo'){
        devices_type();
    }
    opcion="crear";
    $("#formDispositivos").trigger("reset");
    $(".modal-header").css( "background-color", "#157347");
    $(".modal-header").css( "color", "white" );
    $(".modal-title").text("Crear Dispositivo");
    $('#modalCRUD').modal('show');
  })

  //Editar
  $(document).on("click", ".btnEditar", function(){	  

    let categoria = document.getElementById('categoria')
    fila = $(this).closest("tr");
    dispositivos_categoria= fila.find('td:eq(8)').text();
    dispositivos_tipo= fila.find('td:eq(9)').text();
   let inputCuenta= document.getElementById('cuenta');
   inputCuenta.disabled=true;
   inputCodigos.disabled=true;

    if(categoria.name == 'categoria'){
        devices_category(dispositivos_categoria);
    }

    let tipo = document.getElementById('tipo')

    if(tipo.name == 'tipo'){
        devices_type(dispositivos_tipo);
    }          
    opcion='editar';
    cuenta = fila.find('td:eq(0)').text();	   
    nombre = fila.find('td:eq(1)').text();
    telefono = fila.find('td:eq(2)').text();
    contacto= fila.find('td:eq(3)').text();
    direccion = fila.find('td:eq(4)').text();
    ciudad= fila.find('td:eq(5)').text();
    localidad= fila.find('td:eq(6)').text();
    protocolo= fila.find('td:eq(7)').text();
              
    $('#cuenta').val(cuenta);
    $("#nombre").val(nombre);
    $("#telefono").val(telefono);
    $("#contacto").val(contacto);
    $("#direccion").val(direccion);   
    $("#ciudad").val(ciudad);
    $("#localidad").val(localidad);
    $("#protocolo").val(protocolo);
    $(".modal-header").css("background-color", "#31d2f2");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Dispositivo");		
    $('#modalCRUD').modal('show');
});

     //BORRAR
     $(document).on("click", ".btnBorrar", function(){
      fila = $(this);           
      cuenta = fila.closest('tr').find('td:eq(0)').text();  
      nombre = fila.closest('tr').find('td:eq(1)').text();          
      Swal.fire({
          title: '¿Confirma eliminar el dispositivo '+nombre+'?',                
          showCancelButton: true,
          confirmButtonText: `Confirmar`,                
          }).then((result) => {               
          if (result.isConfirmed) {
              $.ajax({
                  url: url+"/"+cuenta,
                  method: 'delete',                        
                  data:  {dispositivo_cuenta:cuenta}    
              }).done((response)=>{
                if(response.status === '410 ERR') {
                  Swal.fire('Ocurrio un error al eliminar el dispositivo: ' + response.data.info,'','error')
                }else{
                  Swal.fire('El dispositivo '+nombre+' Fue eliminado con exito', '', 'success')
                 table.row(fila.parents('tr')).remove().draw();                  

                }
              });
          } 
          })
  }); 
  
  //submit editar y crear
  $('#formDispositivos').submit(function(e){                                     
    e.preventDefault();
    cuenta = $.trim($('#cuenta').val());
    codigos = $.trim($('#codigos').val());   
    nombre = $.trim($('#nombre').val());
    contacto = $.trim($('#contacto').val());
    telefono = $.trim($('#telefono').val());    
    direccion = $.trim($('#direccion').val()); 
    localidad = $.trim($('#localidad').val());   
    ciudad = $.trim($('#ciudad').val()); 
    protocolo = $.trim($('#protocolo').val());     
    tipo_id = $('#tipo').find(":selected").val();
    categoria_id =$('#categoria').find(":selected").val();
     
               

    if(opcion=='crear'){                
        $.ajax({                    
            url: url,
            method: 'post',                                                         
            contentType: 'application/json',  
            data:  JSON.stringify({
              cuenta:cuenta,
              codigos:codigos,
              nombre:nombre, 
              telefono:telefono, 
              contacto:contacto,
              direccion:direccion,
              localidad:localidad,
              ciudad:ciudad,
              protocolo:protocolo,
              dispositivos_tipo_id:tipo_id,
              dispositivos_categoria_id:categoria_id
            }),                       
            success: function(data) {                       
               table.ajax.reload(null, false);                        
            }
        }).done((response)=>{
          console.log(response)
          if(response === 'Duplicated Entry') {
            Swal.fire('Ocurrio un error al agregar el dispositivo: Ya existe este numero de cuenta','','error')
          }else if(response === 'codeAccountNotFound'){
            Swal.fire('El dispositivo no se creo correctamente, la cuenta desde la cual, copiar los codigos, no existe', '', 'error')
            table.ajax.reload(null, false);           
          }else{
            Swal.fire('El dispositivo '+nombre+' Fue creado con exito', '', 'success')
            table.ajax.reload(null, false);   
          }
        });	
    }
    if(opcion=='editar'){
        $.ajax({                    
            url: url+"/"+cuenta,
            method: 'put',                                        
            contentType: 'application/json',  
            data:  JSON.stringify({
              cuenta:cuenta, 
              nombre:nombre, 
              telefono:telefono, 
              contacto:contacto,
              direccion:direccion,
              localidad:localidad,
              ciudad:ciudad,
              protocolo:protocolo,
              dispositivos_tipo_id:tipo_id,
              dispositivos_categoria_id:categoria_id
            }),                       
            success: function(data) {                       
                table.ajax.reload(null, false);                        
            }
        });	
    }        		        
    $('#modalCRUD').modal('hide');											     			
});
  };



function devices_category(dispositivos_categoria){
  
    fetch('api/devices_category')
    .then((data)=>{
      return data.json();
    }).then((dcData)=>{
          dcData.data.forEach((item)=>{
            const categoria = document.getElementById('categoria')
            const option = document.createElement('option')
  
            categoria.name = 'categoriaselecto'
            categoria.appendChild(option)
            option.text = item.nombre
            option.value = item.id
            if(item.nombre==dispositivos_categoria)
              option.selected=true;
          })
    })
  }
  
  function devices_type(dispositivos_tipo){
    
    fetch('api/devices_type')
    .then((data)=>{
      return data.json();
    }).then((dtData)=>{
          dtData.data.forEach((item)=>{
            const tipo = document.getElementById('tipo')
            const option = document.createElement('option')
  
            tipo.name = 'tiposelecto'
            tipo.appendChild(option)
            option.text = item.nombre
            option.value = item.id
            if(item.nombre==dispositivos_tipo)
              option.selected=true;
          })
    })
  }