/* SEARCH BY TEXT */
function search(e){
    /* GET SEARCH TEXT */
    let value = e.target.value.toLowerCase();

    /* IF SEARCH TEXT IS THERE THEN SHOW FILTER INFO MESSAGE OR ELSE REMOVE THAT MESSAGE */
    if(value){
        $('.filterInfo').css('display', 'block')
    }else{
        $('.filterInfo').css('display', 'none')
    }

    /* ITERATE THROUGH EACH ROWS OF TABLE BODY */
    $(".fileDetails table tbody tr").each(function() {
        /* CHECK WHETHER SEARCH TEXT IS PART OF EACH ROW'S DATA & HIDE OR SHOW ROW BASED ON THAT */
        let toggleValue = $(this).text().toLowerCase().indexOf(value) > -1;
        $(this).toggle(toggleValue);
    });
}

/* SORTING OF EACH COLUMN */
function sort(e, index){
    /* MAKE CURSOR TO WAIT */
    $('.mainDiv').css('cursor', 'wait');
    setTimeout(() => {
        let ascOrder = true;

        /* ITERATE THROUGH ALL TABLE HEADERS  */
        $(".fileDetails table thead th").each(function(i) {

            /* IF INDEX DOES NOT MATCH WITH CLICKED COLUMN INDEX THEN REMOVE ALL CLASS */
            if(i == index){

                /* IF SORTING IS NOT APPLIED ON THAT COLUMN THEN START WITH ASCENDING SORT */
                if($(e.target).hasClass('sorted')){

                    /* IF SORTING ORDER IS ASCENDING THEN APPLY DESCENDING ORDER ELSE APPLY ASCENDING ORDER */
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
        /* DONE ITERATIONS OF TABLE HEADERS */

        /* GET ALL TABLE BODY ROWS */
        let rows = $('.fileDetails tbody tr');
        let value = $($('.fileDetails tbody tr')[0]).find('td')[index].innerHTML;
        let isNumber = !isNaN(parseFloat(value));

        /* ITERATE THROUGH ALL ROWS FOR SORTING */
        rows.sort(function(a, b){
            var x = $(a).find('td')[index].innerHTML;
            var y = $(b).find('td')[index].innerHTML;
            
            /* SORT BASED ON NUMBER OR STRING */
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
        /* DONE WITH SORTING */
        
        /* APPEND SORTED ROWS TO TABLE BODY */
        $.each(rows, function(index, row) {
            $('.fileDetails tbody').append(row);
        });

        /* MAKE CURSOR TO DEFAULT */
        $('.mainDiv').css('cursor', 'unset');
    }, 1000);
}