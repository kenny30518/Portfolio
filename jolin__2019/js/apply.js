$(".panel-title a").on('click', function() {
    $(".arrow-right").toggleClass("active");
});

$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});


//監聽字數
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}

$("#thought").on('input propertychange', function () {

    //獲取輸入內容
    var userDesc = $(this).val();

    //判斷字數
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 200);
    } else {
        len = 0
    }

    //顯示字數
    $(".wordsNum").html('還剩下'+(200-len)+'個字可以輸入');
});

$('select').on('click', function() {
    $(this).css('border','1px solid #ced4da')
})

$("form").submit(function(e){
    e.preventDefault();  
});

$('#submit').on('click', function() {
    if ($("#school_area option:selected").text() == "請選擇區域") {
        alert("請選擇區域");
        $('#school_area').css('border','1px solid red');
        return false;
    }

    if ($("#school_name option:selected").text() == "請選擇學校") {
        alert("請選擇學校");
        $('#school_name').css('border','1px solid red');
        return false;
    }

    if ($("#grade option:selected").text() == "請選擇年級") {
        alert("請選擇年級");
        $('#grade').css('border','1px solid red');
        return false;
    }
})

//滑動效果
$('.policy_box a').on('click', function(e){
	if(this.hash !== ''){
		e.preventDefault();

		const hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		},800);

        $('#policy_content').css('animation-name','highlight');
	}
});

//取得使用者上傳照片檔案大小
function findSize() {
    var fileInput =  document.getElementById("customFile");
    try{
        return fileInput.files[0].size; // Size returned in bytes.
    }catch(e){
        var objFSO = new ActiveXObject("Scripting.FileSystemObject");
        var e = objFSO.getFile( fileInput.value);
        var fileSize = e.size;
    }
}

/*
//檢查是否需要壓縮檔案
$('#customFile').on('input', function(){
    var final_result;
    //轉換為mb
    var file_size_mb = findSize()/1024/1024;
    console.log(file_size_mb);
    if (file_size_mb > 3) {
        var fileName = $('#customFile').val();
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        if (fileNameExt == "heic" || fileNameExt == "HEIC") {
            convertHeicToJpg($('#customFile'));
            console.log(final_result);
        }else {
            const file = document.querySelector("#customFile").files[0];
            
            if (!file) return;
            
            const reader = new FileReader();
            
            reader.readAsDataURL(file);
            
            reader.onload = function (event) {
                const imgElement = document.createElement("img");
                imgElement.src = event.target.result;
            
                imgElement.onload = function (e) {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 1020;
                
                    const scaleSize = MAX_WIDTH / e.target.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = e.target.height * scaleSize;
                
                    const ctx = canvas.getContext("2d");
                
                    ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                
                    const srcEncoded = ctx.canvas.toDataURL("image/png", 1);
            
                    $('.image_preview').css('display', 'block');
                    document.querySelector(".image_preview img").src = srcEncoded;
                    final_result = srcEncoded;
                    console.log(final_result);
                };
            };
        }
    }else{
        var fileName = $('#customFile').val();
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        if(fileNameExt == "heic" || fileNameExt == "HEIC") {
            convertHeicToJpgNoResize($('#customFile'));
        }else {
            readURL(this);
        }
    }
});

function readURL(input){
    if(input.files && input.files[0]){    
        var reader = new FileReader();     
        reader.onload = function (e) {
            $('.image_preview').css('display', 'block');
            $(".image_preview img").attr('src', e.target.result);
            final_result = e.target.result;
            console.log(final_result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function convertHeicToJpg(input)
{
    var fileName = $(input).val();
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    console.log(fileNameExt);
    if(fileNameExt == "heic" || fileNameExt == "HEIC") {
        var blob = $(input)[0].files[0]; //ev.target.files[0];
        heic2any({
            blob: blob,
            toType: "image/jpg",
            quality: 0.8,
        })
        .then(function (resultBlob) {
            var url = URL.createObjectURL(resultBlob);
            console.log(url);
            $('.image_preview').css('display', 'block');
            document.querySelector(".image_preview img").src = url;
            final_result = url;
            console.log(final_result);
            let fileInputElement = $(input)[0];
            let container = new DataTransfer();
            let file = new File([resultBlob], "heic"+".jpg",{type:"image/jpeg", lastModified:new Date().getTime()});
            container.items.add(file);
            fileInputElement.files = container.files;
            console.log("added");
        })
        .catch(function (x) {
            console.log(x.code);
            console.log(x.message);
        });
    }
}

function convertHeicToJpgNoResize(input) 
{
    var fileName = $(input).val();
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    console.log(fileNameExt);
    if(fileNameExt == "heic" || fileNameExt == "HEIC") {
        var blob = $(input)[0].files[0]; //ev.target.files[0];
        heic2any({
            blob: blob,
            toType: "image/jpg",
        })
        .then(function (resultBlob) {
            console.log(resultBlob);
            var url = URL.createObjectURL(resultBlob);
            $('.image_preview').css('display', 'block');
            document.querySelector(".image_preview img").src = url;
            
            final_result = url;
            console.log(final_result);
            let fileInputElement = $(input)[0];
            let container = new DataTransfer();
            let file = new File([resultBlob], "heic"+".jpg",{type:"image/jpeg", lastModified:new Date().getTime()});
            container.items.add(file);
            fileInputElement.files = container.files;
            console.log("added");
        })
        .catch(function (x) {
            console.log(x.code);
            console.log(x.message);
        });
    }
}*/

$('#customFile').on('input', function(event,fileInput){
    var file_size_mb = findSize()/1024/1024;
    console.log(file_size_mb);
    if (file_size_mb > 3) {
        compressImage(event);
    }else {
        withoutCompressImage(event);
    }
});

var blob,base64_code;
function compressImage(event) {
    var file = event.target.files[0]
    console.log(file)
    var logDom, progressDom

    logDom = document.querySelector('#main-thread-log')
    progressDom = document.querySelector('#main-thread-progress')

    logDom.innerHTML = 'Source image size:' + (file.size / 1024 / 1024).toFixed(2) + 'mb'
    console.log('input', file)
    imageCompression.getExifOrientation(file).then(function (o) {
        console.log('ExifOrientation', o)
    })

    var options = {
        maxSizeMB: parseInt(1),
        maxWidthOrHeight: parseInt(1080),
        onProgress: onProgress
    }

    imageCompression(file, options)
        .then(function (output) {
            $('.image_preview').css('display','block')
            logDom.innerHTML += ', output size:' + (output.size / 1024 / 1024).toFixed(2) + 'mb'
            blob = output;
            console.log('output', output)
            //呼叫blob轉換Base64
            blobToDataURI(blob,function(result){
                base64_code = result;
                console.log(base64_code);
            })
            const downloadLink = URL.createObjectURL(output)
            console.log(downloadLink)
            logDom.innerHTML += '&nbsp;<a href="' + downloadLink + '" download="' + file.name + '">下載壓縮後圖片</a>'
            document.getElementById('preview-after-compress').src = downloadLink
            //return uploadToServer(output)
        })
        .catch(function (error) {
            alert(error.message)
        })


    function onProgress (p) {
        progressDom.innerHTML = '(' + p + '%' + ')'
    }
}

//blob格式再轉換為base64格式
function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(blob, callback);
    reader.onload = function (e) {
        callback(e.target.result);
    }
}

//無壓縮直接顯示
function withoutCompressImage(event) {
    var file = event.target.files[0]
    console.log(file)
    var logDom, progressDom

    logDom = document.querySelector('#main-thread-log')
    progressDom = document.querySelector('#main-thread-progress')

    logDom.innerHTML = 'Source image size:' + (file.size / 1024 / 1024).toFixed(2) + 'mb'
    console.log('input', file)
    imageCompression.getExifOrientation(file).then(function (o) {
        console.log('ExifOrientation', o)
    })

    const downloadLink = URL.createObjectURL(file)
    console.log(downloadLink)
    $('.image_preview').css('display','block')
    logDom.innerHTML += '&nbsp;<a href="' + downloadLink + '" download="' + file.name + '">下載圖片</a>'
    document.getElementById('preview-after-compress').src = downloadLink
}


function uploadToServer (file) {
  // const formData = new FormData()
  // formData.append('image', file, file.name)
  // const url = 'http://localhost:3000/image-upload-api'
  // console.log('calling api', url, 'with data', Array.from(formData.entries())[0])
  // return fetch(url, {
  //   method: 'POST',
  //   body: formData
  // }).then(res => res.json())
  //   .then(body => console.log('got server response', body))
}