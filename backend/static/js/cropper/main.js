console.log('hello World')

const alertBox = document.getElementById('alert-box')
const imageBox = document.getElementById('image-box')
const imageForm = document.getElementById('image-form')
// console.log(imageForm)
const confirmBtn = document.getElementById('confirm-btn')
const input = document.getElementById('id_file')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

input.addEventListener('change', ()=>{
  console.log('changedd')
  confirmBtn.classList.remove('not-visible')

  const img_data = input.files[0]
  const url = URL.createObjectURL(img_data)
  imageBox.innerHTML = `<img src="${url}" id="image" width="500px" height="100px">`

  var $image = $('#image');

  $image.cropper({
    aspectRatio: 4 / 4,
    crop: function(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    }
  });

  // Get the Cropper.js instance after initialized
  var cropper = $image.data('cropper');

  confirmBtn.addEventListener('click', ()=>{
    cropper.getCroppedCanvas().toBlob((blob)=>{
      const fd = new FormData()
      fd.append('csrfmiddlewaretoken', csrf[0].value)
      fd.append('file', blob, 'my-image.png')

      $.ajax({
        type: 'POST',
        url: imageForm.action,
        enctype: 'multipart/form-data',
        data: fd,
        success: function(response){
          console.log(response)
        },
        error: function(error){
          console.log(error)
        },
        cache: false,
        contentType: false,
        processData: false, 
      })
    })
  })
})

