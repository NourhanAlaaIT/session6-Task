let error = 0;

const form = document.querySelector("#toDoForm");
const title = document.querySelector("#title input");
const desc = document.querySelector("#desc textarea");

//submit event
form.addEventListener("submit", function(event){
    event.preventDefault();

    let formfields = this.querySelectorAll("input, textarea");
    formfields.forEach(function(field) {
      let errorMsg = createElement(
        "p",
        "error-message",
        "*Please fill this field"
      );
      if (
        field.hasAttribute("required") &&
        field.value == "" &&
        !field.classList.contains("invalid")
      ) {
        field.classList.add("invalid");
        field.parentElement.appendChild(errorMsg);
  
        error +=1;
      } else if (field.value!=""){
        field.classList.remove("invalid");
        if (field.nextElementSibling) {
          field.nextElementSibling.remove();
        }
        error = 0
      }
    });
    if (error == 0){
    let card = {
        title: title.value,
        desc: desc.value
    }

    let cardList;
    if(localStorage.getItem("cardList") == null){
        cardList = [];
    } else{
        cardList = JSON.parse(localStorage.getItem("cardList"));
    }
    cardList.push(card);
    localStorage.setItem("cardList", JSON.stringify(cardList));
    
    createCard(card);
  
    this.reset();
    addMsg();
  }
});
//end submit event

window.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("cardList") == null) {
      return;
    }
  
    let cardList = JSON.parse(localStorage.getItem("cardList"));
  
    cardList.forEach(function(element) {
      createCard(element);
    });
  });

//creat card
  function createCard(data){
    let theCard = createElement("article", "card");
    let cardTitle = createElement("h3", "card-title", data.title);
    let cardDesc = createElement("p", "card-desc", data.desc);

    let removeButton = createElement(
        "button",
        "cardRemove",
        '<i class="fa fa-trash-alt"></i>');
    removeButton.addEventListener("click", function(){
        this.parentElement.remove();
    });
    theCard.appendChild(cardTitle);
    theCard.appendChild(cardDesc);
    theCard.appendChild(removeButton);
    document.querySelector(".cards").appendChild(theCard);
}

//creat element 
function createElement(el, className, content) {
    let element = document.createElement(el);
  
    element.className = className;
  
    if (content) {
      element.innerHTML = content;
    }
  
    return element;
  }
//end creat element 

document.querySelector(".cards").addEventListener("click", function(e) {
    if (
      e.target.classList.contains("fa-trash-alt")
    ) {
      let store = JSON.parse(localStorage.getItem("cardList"));
  
      store.forEach(function(el, i) {
        if (
          el.title === e.target.parentElement.parentElement.querySelector(".card-title").innerText
        ) {
          return store.splice(i, 1);
        }
      });
  
      localStorage.setItem("cardList", JSON.stringify(store));
    }
  });
  function addMsg() {
    let txt;
    if (true) {
      txt = "Card is added";
      document.getElementById("notification").innerHTML = txt;
      setTimeout(function() {
        document.getElementById("notification").style.display= "none"
      }, 3000);
    } else {
      return;
    }
  }