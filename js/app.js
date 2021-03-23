'use strict'

let filters = [];
let selected;
let horns = [];
let picId = 1;


function Picture(title, url, desc, keyword, horns) {
    this.title = title;
    this.url = url;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    this.id = (picId++);
    pictures.push(this);
}
let pictures=[];


Picture.prototype.render = function () {
    let $picClone = $('#photo-template').clone();
    $('main').append($picClone);
    $picClone.find('h2').text(this.title);
    $picClone.find('img').attr('src', this.url);
    $picClone.find('p').text(this.desc);
    $picClone.attr('id', this.id);
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
                let hornObject = new Picture(item.title, item.image_url, item.description, item.keyword, item.horns);
                if(filters.includes(item.keyword) === false){
                    filters.push(item.keyword);
                    $('select').append(`<option value="${item.keyword}"> ${item.keyword}></option>`);
                }
                hornObject.render();
                $(`#${hornObject.id}`).css('display', 'inline-block');
                horns.push(hornObject);
            });
        });
};


$('document').ready(()=>{
    
    $(() => Picture.readJson());
    $('select').change(()=>{
        let selectedType = $(this).children('option:selected').val();

        horns.forEach(item =>{
            if (selectedType === item.keyword){

                $(`#${item.id}`).remove();
                item.render();
                $(`#${item.id}`).css('display', 'none');
            }
            if (selectedType === 'default'){
                $(`#${item.id}`).remove();
                item.render();
                $(`#${item.id}`).css('display', 'inline-block');
            }
        })
    })
})



















// $('#select').click(function (event) {
//     event.preventDefault();
//     console.log($("option").value);







//     $('select#my-select').change(function () {
//         let filter = $(this).val();
//         filterList(filter);
//     });

//     // Recruiters filter function
//     function filterList(value) {
//         let list = $("#photo-template");
//         $(list).hide();
//         if (event.target.value == "default") {
//             $("#photo-template").find("div").each(function (i) {
//                 $(this).show();
//             });
//         } else {
//             $(list).hide();
//             // *=" means that if a data-custom type contains multiple values, it will find them
//             // $(".recruiter").find("article[data-custom-type*=" + value + "]").each(function (i) {
//             // 	$(this).show();
//             // });
//         }
//     }
// })








