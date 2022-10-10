let imagesArray = [];

function handleFileSelection(evt) {
  
  let files = evt.target.files;

  // Loop through the FileList and render image files as thumbnails.
  for(let i=0, f; f = files[i]; i++) {
    
    // Only process image files.
    if(!f.type.match('image.*')) {
      continue;
    }
    
    let reader = new FileReader();
    
    // Closure to capture the file information.
    reader.onload = function(e) {
      displayImageData(e.target.result);
      addImage(e.target.result);
    };
    
    reader.readAsDataURL(f);
  }

}

let images = JSON.parse(localStorage.getItem('images'));

function loadFromLocalStorage() {
  
  if(images && images.length > 0) {
    imagesArray = images;
    
    images.forEach(displayImageData);
  }
}

function addImage(imageData) {
  imagesArray.unshift(imageData);
  location.reload();
  
  localStorage.setItem('images', JSON.stringify(imagesArray));
}

let id = 0;

function displayImageData(imageData, id) {

  let span = document.createElement('span');
  let itemHTML = '';
  
  itemHTML += `
  <img class="thumb" src="${imageData}" />
  <button class="removeBtn" id=${id}></button>
  
  `;
  span.innerHTML = itemHTML;
  document.getElementById('list').insertBefore(span, null);
}

id++;


function removeButton(e) {
  let removeBtnId;
  removeBtnId = e.target.id;
  removeBtns[removeBtnId].parentElement.remove();
  
  // Delete the image from an array of localStorage
  images.splice(removeBtnId, 1);

  // Update localStorage
  localStorage.setItem('images', JSON.stringify(images));
}

document.querySelector('.fas').addEventListener('click', ()=> {
  document.getElementById('files').click();
}, false);

document.getElementById('files').addEventListener('change', handleFileSelection, false);

loadFromLocalStorage();

const removeBtns = document.querySelectorAll('.removeBtn');

for(let btn of removeBtns) {
  btn.addEventListener('click', removeButton);
}