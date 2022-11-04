let url_eventos="/api/events/alarms";
if(window.location.hostname=="dev.cdssoftware.com.ar")
  url_eventos="/moron-am"+url_eventos

let contado = 1
var sound = new Howl({
  src: ['audio/alerta.mp3']
});
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

    table = $('#eventos').DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
         ajax: {
           url: url_eventos,
         },
         createdRow: function (row, data, index) {
          if (data.nombre=='') {
              $(row).addClass('table-warning');
          }
      },
          order: [[6, 'desc']],
         columns: [
             { data: 'nombre'},
             { data: 'cuenta'},
             { data: 'telefono' },
             { data: 'contacto' },
             { data: 'direccion' },
             { data: 'mensaje' },
            { data: 'fecha' },
            { data: 'observaciones'}
           ]
         })


  };



  setInterval( function () {
    table.ajax.reload();

    count();
    

},5000 );

function count() {
  let contar = table.data().count()
    
  setTimeout(() => {
    contado = contar + 1
  }, 2000);
    if (contado == contar) {
      sound.play();

      Swal.fire({
        icon: 'warning',
        title: 'Alerta!!!',
        text: "Alerta de alarma " 
        + "Nombre: " + table.row(0).data().nombre
        + "Direccion: " + table.row(0).data().direccion
        + "Telefono: " + table.row(0).data().telefono 
        + "Contacto: " + table.row(0).data().contacto 
        + "Localidad: " + table.row(0).data().localidad 
        + "Protocolo: " + table.row(0).data().protocolo,
        confirmButtonText: "Aceptar",
      }).then(result=>{
        if(result.isConfirmed){
          sound.stop();
        }
      })
      
    }

}


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

