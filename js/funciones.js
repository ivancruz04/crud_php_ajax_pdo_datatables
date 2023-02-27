console.log('hola')

$(document).ready(function() {

    $("#botonCrear").click(function(){
        $("#formulario")[0].reset();
        $(" .modal-title").text("Crear Usuario");
        $("#action").val("Crear");
        $("#operacion").val("Crear");
        $("#imagen_subida").html("");


    });

    var dataTable = $('#datos_usuario').DataTable({
        "processing": true,
        "serverSide": true,
        "order": [],
        "ajax": {
            url: "obtener_registros.php",
            type: "POST"
        },
        "columnsDefs": [
            {
            "targets": [0, 3, 4],
            "orderable": false,
            },
        ]
    });
});

$(document).on('submit', '#formulario', function(event){
    event.preventDefault();
    var nombres = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    var telefono = $("#telefono").val();
    var email = $("#email").val();
    var extension = $("#imagen_usuario").val().split('.').pop().toLowerCase();

    if(extension != ''){
        if(jQuery.inArray(extension, ['gif', 'png', 'jpg', 'jpeg']) == -1){
        alert("Formato de imagen inválido");
        $("#imagen_usuario").val('');
        return false;
        }
    }

    if(nombres != '' && apellidos != '' && email != ''){
        $.ajax({
            url: "crear.php",
            method: "POST",
            data:new FormData(this),
            contentType:    false,
            processData:    false,
            success:function(data){
                alert(data);
                $('#formulario')[0].reset();
                $('#modalUsuario').modal.hide();
                datatable.ajax.reload();
            }
        })
    }else{
        alert("Algunos campos son obligatorios")
    }

});