import { menuArray } from './data.js'

const orderItems = document.getElementById('order-items')
const orderContainer = document.getElementById('order-container')
const totalPrice = document.getElementById('total-price')
const completeBtn = document.getElementById('complete-btn')
const modal = document.getElementById('modal')
const payBtn = document.getElementById('pay-btn')
const outgoingMsg = document.getElementById('outgoing-msg')
const nameInput = document.getElementById('full-name')
const ccnInput = document.getElementById('ccn')
const ccvInput = document.getElementById('ccv')


//--Menu--//

function getMenuHtml(){
    let menuHtml=``
    menuArray.forEach(function(menu){
        menuHtml +=`
    <div class="menu-items">
            <img src= "${menu.image}" class="icon-img">
                <div class="item-container">
                     <h2>${menu.name}</h2>
                    <p1>${menu.ingredients}</p1>
                    <p2>$${menu.price}</p2>
                </div>
                <button class="add-btn" data-add= "${menu.id}">+</button>
    </div>`
    })
    return menuHtml
}

function render(){
    document.getElementById('menu-container').innerHTML = getMenuHtml()
}

render()

//--Order--//

document.addEventListener('click', function(e){
     if(e.target.dataset.add) {
        addOrderClick(e.target.dataset.add)
        }
    else if(e.target.dataset.remove){
        removeOrderClick(e.target.dataset.remove)
        }
    else if(e.target.dataset.id == 'complete-btn'){
        modal.style.display = 'flex'
    }
    else if(e.target.dataset.pay){
        e.preventDefault()
        validateInputs(e.target.dataset.pay)
    }
})

function addOrderClick(itemId) {
    menuArray[itemId].quantity += 1;
    renderOrder()
}

function removeOrderClick(itemId){
    menuArray[itemId].quantity -= 1;
    renderOrder()
}

function renderOrder(){
    let orderHtml=``
    let totalCost = 0;
    orderItems.innerHTML = ``;
    menuArray.forEach((item) => {
        if(item.quantity > 0) {
            totalCost += item.price * item.quantity
            orderItems.innerHTML += 
                `
                    <div class="order-item">
                        <div class="order-item-info">
                            <p>${item.quantity}</p>
                            <h3>${item.name}</h3>
                            <button class="remove-btn" data-remove="${item.id}">remove</button>
                        </div>
                        <h3 class="item-price">$${item.quantity * item.price}</p>
                    </div>  
                `
        }
        if(totalCost == 0) {
            orderContainer.style.display = 'none';
        } 
        else {
            orderContainer.style.display = 'block';
            totalPrice.innerHTML = `$${totalCost}`;
        }
    })
}

function validateInputs() {
  if (!nameInput.value || !ccnInput.value || !ccvInput.value) {
  } 
  else {
    modal.style.display = 'none'
    outgoingMsg.style.display = 'block'
    outgoingMsg.innerHTML = `Thank you ${nameInput.value}! Your order is on its way!`
  }
}