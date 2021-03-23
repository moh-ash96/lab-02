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
    // pictures.push(this);
}
// let pictures=[];


Picture.prototype.render = function () {
    let $picClone = $('#photo-template').clone();
    $picClone.addClass(`${this.keyword}`)
    $('main').append($picClone);
    $picClone.find('h2').text(this.title);
    $picClone.find('img').attr('src', this.url);
    $picClone.find('p').text(this.desc);
    $picClone.attr('id', this.id);
    // console.log(this.keyword);
};
// console.log(pictures[0].title);

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};
let hornObject = [];
Picture.readJson = () => {

    $.ajax('./data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(item => {
                 hornObject = new Picture(item.title, item.image_url, item.description, item.keyword, item.horns);
                
                if(filters.includes(item.keyword) === false){
                    filters.push(item.keyword);
                    $('select').append(`<option value="${item.keyword}"> ${item.keyword}></option>`);
                }
                horns.push(hornObject);
                hornObject.render();
                // $(`#${hornObject.id}`).css('display', 'inline-block');
            });
        });
};

Picture.readJson();

$(document).ready(function () {

    $('#my-select').change(function () {
      if ($(this).val() === 'default') {
        $('.card-div').show();
      } else {
        $('.card-div').hide();
        $('.' + $(this).val()).show();
      }
    });
  
  });







