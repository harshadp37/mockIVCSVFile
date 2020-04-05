/* SEARCH BY TEXT */
function search(e){
    let value = e.target.value.toLowerCase();
    if(value){
        $('.filterInfo').css('display', 'block')
    }else{
        $('.filterInfo').css('display', 'none')
    }
    $(".fileDetails table tbody tr").each(function() {
        let toggleValue = $(this).text().toLowerCase().indexOf(value) > -1;
        $(this).toggle(toggleValue);
    });
}

/* SORTING OF EACH COLUMN */
function sort(e, index){
    $('.mainDiv').css('cursor', 'wait');
    setTimeout(() => {
        let ascOrder = true;
        $(".fileDetails table thead th").each(function(i) {
            if(i == index){
                if($(e.target).hasClass('sorted')){
                if($(e.target).hasClass('asc')){
                    $(e.target).removeClass('asc')
                    $(e.target).addClass('desc')
                    ascOrder = false;
                }else{
                    $(e.target).removeClass('desc')
                    $(e.target).addClass('asc')
                    ascOrder = true;
                }
                }else{
                    $(e.target).addClass('sorted asc');
                    ascOrder = true;
                }
            }else{
                $(this).removeClass('sorted asc desc');
            }
        });

        let rows = $('.fileDetails tbody tr');
        let value = $($('.fileDetails tbody tr')[0]).find('td')[index].innerHTML;
        let isNumber = !isNaN(parseFloat(value));

        rows.sort(function(a, b){
            var x = $(a).find('td')[index].innerHTML;
            var y = $(b).find('td')[index].innerHTML;
            
            if(isNumber) {	
                if(ascOrder) {
                    return x - y;
                } else {
                    return y - x;
                }
            } else {
                if(ascOrder) {
                    if(x < y) return -1;
                    if(x > y) return 1;
                    return 0;
                } else {		
                    if(x > y) return -1;
                    if(x < y) return 1;
                    return 0;
                }
            }
        })

        $.each(rows, function(index, row) {
            $('.fileDetails tbody').append(row);
        });

        $('.mainDiv').css('cursor', 'unset');
    }, 1000);
}