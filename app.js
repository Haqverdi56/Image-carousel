const carouselDiv = document.getElementById('carousel');
let imagesFromApi = document.getElementById('imagesFromApi');
let myCreatedImg = document.getElementById('myCreatedImg');
const leftArrow = document.getElementById('leftArrow');
const rigthArrow = document.getElementById('rigthArrow');
const loadingIcon = document.querySelector('.loading');

const url = 'https://picsum.photos/500/500'
let imagesArr = []
loadingIcon.style.display = 'block'
async function newImage() {
    loadingIcon.style.display = 'none'
    await axios.get(url)
    .then(res => {
        imagesArr.push(res.request.responseURL);
    })

    imagesFromApi.innerHTML = " "

    imagesArr.forEach(imageURL=> {
        let imageContainer = document.createElement('div');
        let newApiImage = document.createElement('img');
        imageContainer.setAttribute('class','mySlides');
        newApiImage.setAttribute('object-fit','cover');
        newApiImage.setAttribute('src',imageURL);
        imageContainer.appendChild(newApiImage);
        imagesFromApi.appendChild(imageContainer);

        let dotIndex = 1 ;
        carouselSlide(dotIndex);
        function nextSlide(n){
            carouselSlide(dotIndex+=n)
        };
        function carouselSlide(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            if (n > slides.length) {dotIndex = 1}    
            if (n < 1) {dotIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";  
            }
            slides[dotIndex-1].style.display = "block";  
          };
          rigthArrow.addEventListener('click',()=>{
            nextSlide(-1);
          });
          leftArrow.addEventListener('click',()=>{
            nextSlide(1);
          });
    });
};
newImage();

const interval = setInterval(async() => {
    if(imagesArr.length === 6) {
        imagesArr.shift(imagesArr[0])
    }
    loadingIcon.style.display = 'block'
    newImage()
}, 3000);
