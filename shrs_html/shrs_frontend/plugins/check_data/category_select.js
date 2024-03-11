var categoryClass='',
    categoryBoxClass='',
    categoryClassShining='',
    date = new Date();

$(document).ready(function(){
    if( $('.sort_btn').length ){
        categoryClass='.sort_btn',
            categoryBoxClass='.sortbox';
        categoryClassShining='sort_shining';
    }else{
        categoryClass='.weeksbtn',
            categoryBoxClass='.weeksbox';
        categoryClassShining='hold';
    }

    categorySetUp();
});

//手機分類
function categorySetUp(){
    $(categoryClass).on( 'click', function(){
        'none'==$(categoryBoxClass).css('display') ? categorySwitch(true) : categorySwitch(false);
    });

    $(window).resize(function(){
        if( 'none'==$(categoryClass).css('display') )
            categorySwitch();
    });
}

//分類開關
function categorySwitch(switchType){
    if( null!=switchType ){
        if( switchType ){
            null != $(categoryClass).attr('class').match(/sort/g) ? $(categoryClass).addClass(categoryClassShining) : $(categoryClass).children().addClass(categoryClassShining);
            $(categoryBoxClass).css('display', 'block');
        }else{
            null != $(categoryClass).attr('class').match(/sort/g) ? $(categoryClass).removeClass(categoryClassShining) : $(categoryClass).children().removeClass(categoryClassShining);
            $(categoryBoxClass).css('display', '');
        }
    }else{
        null != $(categoryClass).attr('class').match(/sort/g) ? $(categoryClass).removeClass(categoryClassShining) : $(categoryClass).children().removeClass(categoryClassShining);
        $(categoryBoxClass).css('display', '');
    }
}

