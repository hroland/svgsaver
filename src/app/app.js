/* Copyright (c) 2017 Roland Horváth. All Rights Reserved */

window.$ = window.jQuery = require('jquery');
let compareVersions = require('compare-versions');

$(document).ready(function() {

    $('#save-button').on('click', function() {
        var file = new Blob([$('#svg-input').val()], {'type': 'image/svg+xml'});
        $('#save-button').prop('href', URL.createObjectURL(file)).prop('download', 'svg.svg');
    });

    $('#svg-input').on('keyup', function() {
        delay(function(){ preview(); }, 300);

        if ($('#svg-input').val().length < 1)
            $('#save-button').addClass('disabled');
        else
            $('#save-button').removeClass('disabled');
    });

    $('.colors button').on('click', function() {
        $('#preview').css('background-color', $(this).hasClass('dark') ? '#2A3341' : '#cad1e6');
    });

    /* 🐰🥚 */
    $('.footer .version').on('click', function() {
        $(this).toggleClass('rotate');
    });

    $('[data-link]').each(function() { $(this).on('click', function() {
        window.open($(this).attr('data-link'), "_system");
    })});


    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    function preview() {
        console.log('refreshing');

        var svg = $('#svg-input').val();

        $('#preview').children().each(function (){$(this).remove();});
        $('#preview').append($(svg));
    }

    function checkForUpdates() {

        let appVersion = '0.0.9';

        $.ajax({
            url: 'https://raw.githubusercontent.com/hroland/svgsaver/master/VERSION',
            type: "GET",
            success: function (data){

                var versions = $.parseJSON(data);

                if (compareVersions(versions[0].version, appVersion)) {
                    console.log('Update v' + versions[0].version + ' available!');
                    $('.footer .author .light').addClass('hidden');
                    $('.footer .update').removeClass('hidden');
                } else {
                    console.log('No updates available.');
                }

            }
        })
    }

    checkForUpdates();

});
