let url_logs="/api/events";
let secuence,datetime;
if(window.location.hostname=="dev.cdssoftware.com.ar")
  url_logs="/moron-am"+url_logs

window.onload=function() {
  $.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iFini = document.getElementById('min').value;
        var iFfin = document.getElementById('max').value;
        var iStartDateCol = 6;
        var iEndDateCol = 6;
 
        iFini=iFini.substring(6,10) + iFini.substring(3,5)+ iFini.substring(0,2);
        iFfin=iFfin.substring(6,10) + iFfin.substring(3,5)+ iFfin.substring(0,2);
 
        var datofini=aData[iStartDateCol].substring(6,10) + aData[iStartDateCol].substring(3,5)+ aData[iStartDateCol].substring(0,2);
        var datoffin=aData[iEndDateCol].substring(6,10) + aData[iEndDateCol].substring(3,5)+ aData[iEndDateCol].substring(0,2);
 
        if ( iFini === "" && iFfin === "" )
        {
            return true;
        }
        else if ( iFini <= datofini && iFfin === "")
        {
            return true;
        }
        else if ( iFfin >= datoffin && iFini === "")
        {
            return true;
        }
        else if (iFini <= datofini && iFfin >= datoffin)
        {
            return true;
        }
        return false;
    })

 
      $('#min').keyup( function() { table.draw(); } );
      $('#max').keyup( function() { table.draw(); } );


    table = $('#logs').DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
         ajax: {
           url: url_logs,
         },
          order: [[6, 'desc']],
         columns: [
             { data: 'nombre'},
             { data: 'cuenta' },
             { data: 'mensaje' },
             { data: 'prioridad' },
             { data: 'calificador' },
             { data: 'secuencia'},
             { data: 'fecha',
              visible: true,
              searchable: true},
              {data: 'observaciones',
            visible: true,
          searchable:false},
          {defaultContent: "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar' data-bs-toggle='tooltip' data-bs-placement='top' title='Editar'><i class='bi bi-pencil text-white'></i></button></div></div>"}
              
           ]
         })

        // Modal Boton Editar 
        $(document).on("click", ".btnEditar", function(){	  
          fila = $(this).closest("tr");
          secuence=fila.closest('tr').find('td:eq(5)').text();
          datetime=fila.closest('tr').find('td:eq(6)').text();
          observaciones=fila.find('td:eq(7)').text();
        $(".modal-header").css("background-color", "#31d2f2");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar Evento");		
        $('#observaciones').val(observaciones);
        $('#modalCRUD').modal('show');
        });
        $('#formEventos').submit(function(e){                                     
          e.preventDefault();
          observaciones = $.trim($('#observaciones').val());        

              $.ajax({                    
                  url: url_logs+"/"+secuence,
                  method: 'put',                                        
                  contentType: 'application/json',  
                  data:  JSON.stringify({
                    observaciones:observaciones,
                    fecha:datetime
                  }),                       
                  success: function(data) {                       
                      table.ajax.reload();                        
                  }
              })
                 		        
          $('#modalCRUD').modal('hide');											     			
      });

  };
  setInterval( function () {
    table.ajax.reload();

},60000 );



let check = document.getElementById("flexCheckIndeterminate")
check.onchange= () => {
  let fecha = new Date();
  const valor = document.getElementById('flexCheckIndeterminate').checked
  if(valor == true){
    document.getElementById("min").value = fecha.toJSON().slice(0,10);
    document.getElementById("max").value = fecha.toJSON().slice(0,10);
    document.getElementById("min").setAttribute('disabled', true)
    document.getElementById("max").setAttribute('disabled', true)
    table.draw();
  }else{
    document.getElementById("max").value = fecha.toJSON().slice(0,10);
    document.getElementById("min").value = sumarDias(fecha, -10).toJSON().slice(0,10);
    document.getElementById("min").removeAttribute('disabled')
    document.getElementById("max").removeAttribute('disabled')
    table.draw();
  }
}





function sumarDias(fechita, dias){
  fechita.setDate(fechita.getDate() + dias);
  return fechita;
}
let fecha = new Date();
document.getElementById('max').value = fecha.toJSON().slice(0,10);
document.getElementById('min').value = sumarDias(fecha, -10).toJSON().slice(0,10);

