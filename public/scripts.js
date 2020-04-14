const receipes = document.querySelectorAll('.receipe')
const details = document.querySelectorAll('.details')

for (const [index, receipe] of receipes.entries()) {

    receipe.addEventListener("click", function(){
        event.preventDefault()
        window.location.href = `/recipes/${index}`
    })
}

for (const detail of details) {
    const a = detail.querySelector('.details a')

    a.addEventListener('click', function () {
        if (detail.querySelector('.content').classList.contains('hidden')) {
            a.innerText = 'ESCONDER'
            detail.querySelector('.content').classList.remove('hidden')
        } else {
            a.innerText = 'MOSTRAR'
            detail.querySelector('.content').classList.add('hidden')
        }
    })
}