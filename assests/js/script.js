function search(e){
    let value = e.target.value.toLowerCase();
    $(".fileDetails table tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}