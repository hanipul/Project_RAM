const imgDiv = document.querySelector('.user-img');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadbtn = document.querySelector('#upload-button');

file.addEventListener('change', function(){
const chosedfile = this.files[0];
if(chosedfile){
    const reader = new FileReader();

    reader.addEventListener('load', function(){
        img.setAttribute('src', reader.result);
    })
reader.readAsDataURL(chosedfile);
    }
})

$(function() {
    $("#date-picker").multiDatesPicker({
        dateFormat: "yy-mm-dd"
    });
});