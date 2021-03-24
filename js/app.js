'use strict'

let filters = [];
let selected;
let horns = [];
let picId = 1;
let horns2 = [];


let templateId = '#picTemplate';
function Picture(title, url, desc, keyword, horns) {
    this.title = title;
    this.url = url;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    this.id = (picId++);
    // pictures.push(this);
}

// function Picture(rawDataObject) {
    
//     for (let elements in rawDataObject){
//         this[elements] = rawDataObject[elements];
//     }
//     this.id = (picId++);
//     pictures.push(this);
// }



Picture.prototype.render = function () {
    let $picClone = $('#photo-template').clone();
    $picClone.addClass(`${this.keyword}`)
    $('#picSection').append($picClone);
    $picClone.find('h2').text(this.title);
    $picClone.find('img').attr('src', this.url);
    $picClone.find('p').text(this.desc);
    $picClone.attr('id', this.id);
    
};
// Picture.prototype.toHTML = function (){
//     let template = $(templateId).html();
//     let html = Mustache.render(template, this);
//     return html;
// }

Picture.prototype.render2 = function () {
    let $picClone = $('#photo-template2').clone();
    $picClone.addClass(`${this.keyword}`)
    $('#picSection2').append($picClone);
    $picClone.find('#h2').text(this.title);
    $picClone.find('#img2').attr('src', this.url);
    $picClone.find('#p2').text(this.desc);
    $picClone.attr('id', this.id);
    
};


const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

let hornObject = [];

// let pictureDataSet = [];

Picture.readJson = () => {

    // pictureDataSet.push($.ajax('./data/page-1.json', ajaxSettings));
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
            });
            
        });
        // console.log($.ajax('./data/page-1.json', ajaxSettings));
        // console.log(ajax1);
        hornObject = [];
    };


    // pictureDataSet.forEach(pictureObject => {
    //     pictures.push(new Picture(pictureObject));
    // });

    // pictures.forEach(ourNewPictureObject => {
    //     $('#picSection').append(ourNewPictureObject.toHtml());
    // });
   
    $('#b1').click (() => Picture.readJson());


// let hornObject2;

Picture.readJson2 = () => {
    $.ajax('./data/page-2.json', ajaxSettings)
    .then(data => {
        data.forEach(item => {
            hornObject = new Picture(item.title, item.image_url, item.description, item.keyword, item.horns);
            
            if(filters.includes(item.keyword) === false){
                filters.push(item.keyword);
                $('select').append(`<option value="${item.keyword}"> ${item.keyword}></option>`);
            }
            hornObject.render2();
            
            horns2.push(hornObject);
        });
        // $(`#${hornObject2.id}`).css('display', 'inline-block');
    });
    // $('#picSection').empty();
        
};

$('#b2').click (() => Picture.readJson2());


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

  $(document).ready(function () {

    $('#my-select').change(function () {
      if ($(this).val() === 'default') {
        $('.card-div2').show();
      } else {
        $('.card-div2').hide();
        $('.' + $(this).val()).show();
      }
    });
  
});