'use strict'

let filters = [];

function Picture(items) {
    for (let i in items) {
        this[i] = items[i];
    }
}


function compare(a, b) {
    const picA = a.title.toUpperCase();
    const picB = b.title.toUpperCase();

    let comparison = 0;
    if (picA > picB) {
        comparison = 1;
    } else if (picA < picB) {
        comparison = -1;
    }
    return comparison;
}

function compareHorn(a, b) {
    const picA = a.horns;
    const picB = b.horns;

    let comparison = 0;
    if (picA > picB) {
        comparison = 1;
    } else if (picA < picB) {
        comparison = -1;
    }
    return comparison;
}

let pictrueItems = [];

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

function sorting() {
    $("input[type='radio'").click(function () {
        let radioc = $("input[name='sort']:checked").val();
        if (radioc == 'title') {
            $('#picSection').empty();
            pictrueItems.sort(compare);

            pictrueItems.forEach(newObj => {

                const template = $('#template').html();

                const html = Mustache.render(template, newObj);

                $('#picSection').append(html);
            });

        } else if (radioc == 'horns') {
            $('#picSection').empty();
            pictrueItems.sort(compareHorn);

            pictrueItems.forEach(newObj => {

                const template = $('#template').html();

                const html = Mustache.render(template, newObj);

                $('#picSection').append(html);
            });

        }
    })
}



$(function () {
    $.ajax('data/page-1.json', ajaxSettings).then(data => {
        data.forEach(items => {

            let newItem = new Picture(items);
            pictrueItems.push(newItem);

            if (filters.includes(items.keyword) == false) {
                filters.push(items.keyword);
                $('#my-select').append(`<option value = "${items.keyword}" class = "opt">${items.keyword}</option>`);
            };
            const template = $('#template').html();

            const html = Mustache.render(template, items);

            $('#picSection').append(html);
        });

        sorting();
    })
    $('#b1').on('click', (event) => {
        event.preventDefault();
        filters = [];
        pictrueItems = [];
        $('.opt').remove();
        $('#picSection').empty();
        $.ajax('data/page-1.json', ajaxSettings).then(data => {
            data.forEach(items => {

                let newItem = new Picture(items);
                pictrueItems.push(newItem);

                if (filters.includes(items.keyword) == false) {
                    filters.push(items.keyword);
                    $('#my-select').append(`<option value = "${items.keyword}" class = "opt">${items.keyword}</option>`);
                };
                const template = $('#template').html();

                const html = Mustache.render(template, items);

                $('#picSection').append(html);
            });

            sorting();

        });

    });
});


$(function () {
    $('#b2').on('click', (event) => {
        event.preventDefault();
        filters = [];
        pictrueItems = [];
        $('.opt').remove();
        $('#picSection').empty();
        $.ajax('data/page-2.json', ajaxSettings).then(data => {
            data.forEach(items => {
                let newItem = new Picture(items);
                pictrueItems.push(newItem);

                if (filters.includes(items.keyword) == false) {
                    filters.push(items.keyword);
                    $('#my-select').append(`<option value = "${items.keyword}" class = "opt">${items.keyword}</option>`);
                };

                const template = $('#template').html();

                const html = Mustache.render(template, items);

                $('#picSection').append(html);

            });

            sorting();

        })
    })
})




$('#my-select').change(function () {
    if ($(this).val() === 'default') {
        $('div').show();
    } else {
        $('div').hide();
        $('.' + $(this).val()).show();
    }
});