<script>
    var table = 'table_barang';
    var form = 'form_barang';
    $(()=> {
        // HELPER.block()
    })

    onSave = () => {
        var formData = new FormData($(`[name="${form}"]`)[0]);
        
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url : "{{route('barang/store')}}",
            method : 'post',
            data : formData,
            processData: false,
            contentType: false,
            success : function(res) {
                // JSON.parse(res);
                window.location.reload();
                console.log(res.message)
            } 
        })
    }
</script>