import {menuArray} from '/data.js'

const menuList = document.getElementById('menu-list') 
const orderList = document.getElementById('order-list')
const order = document.getElementById('order')
const priceNumber = document.getElementById('price-number')
const modal = document.getElementById('modal')
let orderComplete = document.getElementById('order-complete')

let completeMenu = ""
let completeOrder = ""
let orderArr = []

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-btn')) {
        const item = menuArray.find((item) => item.id == e.target.id)
        if (order.classList.contains('hide-list')) {
            order.classList.remove('hide-list')
        }
        orderArr.push(item)
        renderOrder()
    }

    if (e.target.classList.contains('remove-btn')) {
        const itemId = e.target.dataset.id
        const index = orderArr.findIndex(item => item.id == itemId)
        orderArr.splice(index, 1)
    }


    if (orderArr.length === 0) {
        order.classList.add('hide-list')
    }

    if (e.target.classList.contains('order-btn')) {
        if (modal.classList.contains('hide-list')) {
            modal.classList.remove('hide-list')
        }
    }

    if (e.target.classList.contains('cancel-btn')) {
        if (!modal.classList.contains('hide-list')) {
            modal.classList.add('hide-list')
        }
    }

    renderOrder()
 })

 document.addEventListener('submit', function(e) {
    if (e.target.id === 'orderForm') {
        e.preventDefault()
        
        const name = e.target.elements['name'].value
        
        if (name.trim()) {
            orderComplete.textContent = `Thanks, ${name}! Your order is on its way!`
            orderComplete.classList.remove('hide-list')
            
            modal.classList.add('hide-list')
            order.classList.add('hide-list')
            
            orderArr = []
            renderOrder()
            
            e.target.reset()
        }
    }
})

function createMenu () {
    for (let item in menuArray) {
        const currentItem = menuArray[item]
        completeMenu += `<div class="menu-item">
                    <img src="img/${currentItem.img}">
                    <div class="item-description">
                        <h3>${currentItem.name}</h3>
                    <p class="ingredients">${currentItem.ingredients}</p>
                    <p>$${currentItem.price}</p>
                    </div>
                    <button class="add-btn" id="${currentItem.id}">+</button>
                </div>`
    }
}

function renderOrder () {
    orderList.innerHTML = ""

    const computePrice = orderArr.reduce((total, item) => {
        return total + item.price
    }, 0)
    
    // Создаем HTML для всех элементов
    const orderHtml = orderArr.map(item => 
        `<li class="order-item">
        <div><span>${item.name}</span>
            <span class="remove-btn" id="${item.id}">remove</span>
        </div>
            <span class="item-price">$${item.price}</span>
        </li>`
    ).join('')
    

    orderList.innerHTML = orderHtml
    priceNumber.textContent = `$${computePrice}`
}


createMenu()

menuList.innerHTML = completeMenu
