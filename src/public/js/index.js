const socketClient = io()

const form = document.getElementById("formulario")
const inputTitle = document.getElementById("prodTitle")
const inputDesc = document.getElementById("prodDesc")
const inputPrice = document.getElementById("prodPrice")
const inputThumb = document.getElementById("prodThumb")
const inputStock = document.getElementById("prodStock")
const inputCategory = document.getElementById("prodCategory")
const inputCode = document.getElementById("prodCode")
const div = document.getElementById("div")

let obj = ""

form.onSubmit = (e)=>{
    e.preventDefault()
    let obj = {
        title:inputTitle.value,
        description: inputDesc.value,
        price: inputPrice.value,
        thumbnails: inputThumb.value || " ",
        stock: inputStock.value,
        category: inputCategory.value,
        status: true,
        code: inputCode.value
    }
    socketClient.emit("objeto", obj)
}

socketClient.on("productos", (addLiProducts)=>{
    let addProdToHTML = ""
    addLiProducts.forEach(prd=>{
        addProdToHTML +=  `<li id="title">${prd.title}</li>`
        div.innerHTML = addProdToHTML
    })
})

socketClient.on("addProductToHTML",(addLiProducts)=>{
    let addProdToHTML = ""
    addLiProducts.forEach(prd=>{
        addProdToHTML +=  `<li id="title">${prd.title}</li>`
        div.innerHTML = addProdToHTML
    })

})

/* chat */

