'use strict'
function Picture(pic) {
    this.title = pic.title;
    this.image_url = pic.image_url;
    this.description = pic.description;
    this.keyword = pic.keyword;
    pictures.push(this);
}
let pictures=[];


Picture.prototype.render = function () {
    let $picClone = $('#photo-template').clone();
    $('main').append($picClone);
    $picClone.find('h2').text(this.title);
    $picClone.find('img').attr('src', this.image_url);
    $picClone.find('p').text(this.description);
    // console.log(this.keyword);
};
// console.log(pictures[0].title);

Picture.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('./data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(item => {
                let horn = new Picture(item);
                //   console.log(horn);
                horn.render();
            });
        });
};

$(() => Picture.readJson());

$('#select').click(function (event) {
    event.preventDefault();
    console.log($("option").value);







    $('select#my-select').change(function () {
        let filter = $(this).val();
        filterList(filter);
    });

    // Recruiters filter function
    function filterList(value) {
        let list = $("#photo-template");
        $(list).hide();
        if (event.target.value == "default") {
            $("#photo-template").find("div").each(function (i) {
                $(this).show();
            });
        } else {
            $(list).hide();
            // *=" means that if a data-custom type contains multiple values, it will find them
            // $(".recruiter").find("article[data-custom-type*=" + value + "]").each(function (i) {
            // 	$(this).show();
            // });
        }
    }
})








