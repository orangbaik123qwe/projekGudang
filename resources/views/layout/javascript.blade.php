<script>
    $(() => {
        getMenu()
       
    })

    getMenu = () => {
        // HELPER.block();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url : "{{route('getPage')}}",
            method : 'post',
            success: function(data){
                
                $('.navbar-menu').html(data.navbar)
                $('.sidebar-menu').html(data.sidebar)

                // HELPER.unblock()
            }
        })
    }
</script>