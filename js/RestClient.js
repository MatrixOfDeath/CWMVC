/**
 * Created by MatrixOfDeath on 24/11/2015.
 */
function query(httpMethod, data, callback){
    var urlp = '';
    if(httpMethod == "DELETE"){
        urlp = '/method=data'+ data;
    }
    $.ajax({
        url: "http://local.cw16mvc.fr/Article/restAPI"+urlp,
        type: httpMethod,
        dataType: "json",
        data    : 'method=data&content='+ data,
        success : function(res){
            callback(res);
           /* $.each(res, function(idx, body){
                return(body);
            });*/
                //console.log(response);
        },
        error   : function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        },
    });
}

$(document).ready(function(){

    $('.articles').delegate('.buttonAdd', 'click', function(e){
        $(this).parent().parent('tr').clone().appendTo('.articles');
        $(this).hide();
        $(this).parent().siblings().find('.inputTitre').show();
        //$(this).parent().siblings().find('span.authorName').show();
        //$(this).parent().siblings().find('span.dateTime').show();
        $(this).parent().siblings().find('.inputContent').show();
        $(this).parent().find('.buttonPost').show();
    });
     $('.articles').delegate('.title', 'dblclick', function(e){
         if($(this).parent('tr').hasClass('rows')) {
             $(this).find('.titre').hide();
             $(this).find('.inputTitre').show();
             $(this).parent().find('.action > .buttonPut').show();
         }

     });
    $('.articles').delegate('.input', 'dblclick', function(e){
        if($(this).parent('tr').hasClass('rows')) {
            $(this).find('.content').hide();
            $(this).find('.inputContent').show();
            $(this).parent().find('.action > .buttonPut').show();
        }
    });

    $('.articles').delegate('.buttonPut', 'click', function(e){
        if($(this).parent().find('input.id').val()){
            console.log('Sending Put');
            query(  'PUT'
                    ,$(this).parent().siblings().find('.inputContent').val() + '&old_content=' + $(this).parent().siblings().find('.content').text() + '&titre=' + $(this).parent().siblings().find('.inputTitre').val() + '&id=' + $(this).parent().find('input.id').val()
                    ,function (res){
                        if (res.body.response){
                            $(this).parent().siblings().find('.content').text($(this).parent().siblings().find('.inputContent').val());
                            $(this).parent().siblings().find('.titre').text($(this).parent().siblings().find('.inputTitre').val());
                            $(this).parent().siblings().find('.content').show();
                            $(this).parent().siblings().find('.titre').show();
                            $(this).parent().siblings().find('.inputContent').hide();
                            $(this).parent().siblings().find('.inputTitre').hide();

                            //Message ok à côté des actions
                        }
                 }.bind(this));

        }else{
            alert('Veuillez saisir une donnée' );
        }
    });
    $('.articles').delegate('.buttonPost', 'click', function(e){
            if($(this).parent().siblings().find('.inputContent').val() != 0 && $(this).parent().siblings().find('.inputTitre').val()){
                console.log('Sending Post');
                query(  'POST'
                        , $(this).parent().siblings().find('.inputContent').val() + '&titre=' + $(this).parent().siblings().find('.inputTitre').val()
                        , function (res){
                            if (res.body.response){
                                //console.log(res.body.id);

                                $(this).parent().siblings().find('span.content').text($(this).parent().siblings().find('.inputContent').val());
                                $(this).parent().siblings().find('span.titre').text($(this).parent().siblings().find('.inputTitre').val());
                                $(this).parent().siblings().find('span.nid').text(res.body.id);
                                $(this).parent().find('input.id').val(res.body.id);
                                $(this).parent().siblings().find('span.content').show();
                                $(this).parent().siblings().find('span.titre').show();
                                $(this).parent().siblings().find('input.inputContent').hide();
                                $(this).parent().siblings().find('input.inputTitre').hide();

                                $(this).parent().siblings().find('span.authorName').text(res.body.author);
                                $(this).parent().siblings().find('span.authorName').show();
                                $(this).parent().siblings().find('span.dateTime').show();

                                $(this).parent().find('.buttonDelete').show();
                                $(this).parent().parent('tr').removeClass('new');
                                $(this).parent().parent('tr').addClass('rows');
                                $(this).hide();
                            }
                    }.bind(this));

            }else{
                alert('Veuillez saisir une donnée' );
            }

    });
    $('.articles').delegate('.buttonDelete', 'click', function(e){
            if($id = $(this).parent().find('input.id').val()){
                console.log('Sending Delete:' + $id);
                query('DELETE', '&id=' + $id , function (res){
                    if (res.body.response){
                        $(this).parent().parent('tr').remove();

                    }
                }.bind(this));

                //console.log(response.body);

            }else{
                alert('Pas de données trouver' );
            }
    });
    $('.articles').delegate('.buttonGet', 'click', function(e) {
        if($('.inputGet').length != 0 && $('.inputGet').val()){
            //console.log('Sending Get');
            query('GET',  $('.inputGet').val());
        }else{
            alert('Veuillez saisir une donnée' );
        }
    });

        /* $('.title').dblclick(function(e){
            // console.log("double clicked");
             $(this).find('.titre').hide();
             $(this).find('.inputTitre').show();
             $(this).parent().find('.action > .buttonPut').show();
         });

         $('.input').dblclick(function(e){
             //console.log("double clicked");
             $(this).find('.content').hide();
             $(this).find('.inputContent').show();
             $(this).parent().find('.action > .buttonPut').show();

         });*/

   /*if ($('.buttonAdd').length != 0){
        $('.buttonAdd').click(function(){
            //$('tr.new').clone().appendTo('.articles');
            $(this).hide();
            $(this).parent().siblings().find('.inputTitre').show();
            $(this).parent().siblings().find('.inputContent').show();
            $(this).parent().find('.buttonPost').show();
        });
    }*/

    /**if($('.buttonGet').length != 0){
        $('.buttonGet').click(function(){
            if($('.inputGet').length != 0 && $('.inputGet').val()){
                //console.log('Sending Get');
                query('GET',  $('.inputGet').val());
            }else{
                alert('Veuillez saisir une donnée' );
            }

        });
    }**/
    /**if($('.buttonPut').length != 0){
        $('.buttonPut').click(function(){
            if($(this).parent().find('input.id').val()){
                console.log('Sending Put');
                var response = query('PUT',  $(this).parent().siblings().find('.inputContent').val() + '&old_content=' + $(this).parent().siblings().find('.content').text() + '&titre=' + $(this).parent().siblings().find('.inputTitre').val() + '&id=' + $(this).parent().find('input.id').val());
                console.log(response['body']);

            }else{
                alert('Veuillez saisir une donnée' );
            }
        });
    }**/

   /* if($('.buttonPost').length != 0){
        $('.buttonPost').click(function(){
            if($(this).parent().siblings().find('.inputContent').val() != 0 && $(this).parent().siblings().find('.inputTitre').val()){
                console.log('Sending Post');
                query('POST', $(this).parent().siblings().find('.inputContent').val() + '&titre=' + $(this).parent().siblings().find('.inputTitre').val()  );
            }else{
                alert('Veuillez saisir une donnée' );
            }
        });
    }*/

    /*if($('.buttonDelete').length != 0){
        $('.buttonDelete').click(function(){
            if($id = $(this).parent().find('input.id').val()){
                console.log('Sending Delete:' + $id);
                var response = query('DELETE', '&id=' + $id);
                console.log(response.body);
                if (response['body'])  {
                    
                }
            }else{
                alert('Pas de données trouver' );
            }

        });
    }*/
});