const modalOverlay = document.querySelector('.modal-overlay')
const receipes = document.querySelectorAll('.receipe')

for (let receipe of receipes) {
    receipe.addEventListener("click", function(){
        const imgId = receipe.getAttribute("id");
        const tittle = receipe.querySelector(".plate p").textContent;
        const content = receipe.querySelector(".name p").textContent;

        modalOverlay.classList.add('actived');

        event.preventDefault();

        modalOverlay.querySelector("img").src = imgId;
        modalOverlay.querySelector(".tittle-modal").textContent = tittle;
        modalOverlay.querySelector(".chef-modal").textContent = content;
    })
}

document.querySelector('.close-modal').addEventListener("click", function() {
    modalOverlay.classList.remove('actived')
    event.preventDefault()
}) 