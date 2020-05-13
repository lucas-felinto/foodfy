// MOSTRAR / ESCONDER
const details = document.querySelectorAll('.details')

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

//ADD INGREDIENTE / PREPARO
function addIngrediente(){
    const ingredientes = document.querySelector(".ingredients")
    const fieldContainer = document.querySelectorAll(".ing")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredientes.appendChild(newField);
    }

    document.querySelector(".p2").addEventListener("click", addIngrediente)

function addPreparo(){
    const ingredientes = document.querySelector(".passo-preparo")
    const fieldContainer = document.querySelectorAll(".prep")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredientes.appendChild(newField);
    }

    document.querySelector(".p3").addEventListener("click", addPreparo)

//DELETAR RECEITA
const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Delete?")
        if (!confirmation) {
            event.preventDefault()
        }
})

