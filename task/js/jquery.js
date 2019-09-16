var error = 0;

var form = $("#toDoForm");
var title = $("#title input");
var desc = $("#desc textarea");

//submit event
form.on("submit", function(event){
    event.preventDefault();

    var formfields = $(this).find("input, textarea");
    formfields.each(function(field) {
      var errorMsg = createElement(
        "p",
        "error-message",
        "*Please fill this field"
      );
      if (
        $(field).attr("required") &&
        $(field).val == "" &&
        !$(field).hasClass("invalid")
      ) {
        $(field).addClass("invalid");
        $(field).parent().append(errorMsg);  
        $(error) +=1;
      } else if (field.value!=""){
        $(field).removeClass("invalid");
        if ($(field).next(".error-message")) {
            $(field).next(".error-message").hide();
        error = 0
      }
    }
    });
    if (error == 0){
    var card = {
        title: $(title).val(),
        desc: $(desc).val()
    }

    var cardList;
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

$(document).ready(function() {
    if (localStorage.getItem("cardList") == null) {
      return;
    }
  
    var cardList = JSON.parse(localStorage.getItem("cardList"));
  
    $(cardList).each(function(element) {
      createCard(element);
    });
  });

//creat card
  function createCard(data){
    var theCard = createElement("article", "card");
    var cardTitle = createElement("h3", "card-title", data.title);
    var cardDesc = createElement("p", "card-desc", data.desc);

    var removeButton = createElement(
        "button",
        "cardRemove",
        '<i class="fa fa-trash-alt"></i>');
    $(removeButton).on("click", function(){
        $(this).parent().fadeOut();
    });
    $(theCard).append(cardTitle, cardDesc, removeButton).appendTo($(".cards"))
}

//creat element 
function createElement(el, className, content) {
    var element = document.createElement(el);
  
    $(element).addClass = (className);
  
    if (content) {
      $(element).html(content);
    }
  
    return element;
  }
//end creat element 

$(".cards").on("click", function(e) {
    if (
      $(e.target).hasClass("fa-trash-alt")
    ) {
      var store = JSON.parse(localStorage.getItem("cardList"));
  
      $(store).each(function(el, i) {
        if (
            el.title ===
            $(e.target)
              .parent()
              .siblings(".card-title")
              .text()        ) {
          return store.splice(i, 1);
        }
      });
  
      localStorage.setItem("cardList", JSON.stringify(store));
    }
  });

  function addMsg() {
    var txt;
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