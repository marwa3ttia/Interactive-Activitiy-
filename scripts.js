var pageWidth, pageHeight;
var basePage = {
  width: 800,
  height: 600,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
};
$(function () {
  var $page = $(".page_content");
  getPageSize();
  scalePages($page, pageWidth, pageHeight);
  $(window).resize(
    _.debounce(function () {
      getPageSize();
      scalePages($page, pageWidth, pageHeight);
    }, 150)
  );
  function getPageSize() {
    pageHeight = $("#container").height();
    pageWidth = $("#container").width();
  }
  function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1,
      scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = scaleX > scaleY ? scaleY : scaleX;
    var newLeftPos = Math.abs(
      Math.floor((basePage.width * basePage.scale - maxWidth) / 2)
    );
    page.attr(
      "style",
      "-webkit-transform:scale(" +
        basePage.scale +
        ");left:" +
        newLeftPos +
        "px;top:" +
        0 +
        "px;"
    );
  }
});

window.addEventListener("load", function () {
  const loader = document.querySelector(".se-pre-con");
  loader.className += " hidden";
});
// -----------------------------------------------------------------
var correct_audio = new Audio(
  "https://educationalrc.org/tasks/4/assets/audio/correct.mp3"
);
var incorrect_audio = new Audio(
  "https://educationalrc.org/tasks/4/assets/audio/incorrect.mp3"
);

let answer;
let answer_list = document.querySelectorAll(".question_answer li");
answer_list.forEach((item, i) => {
  item.addEventListener("click", function () {
    removeSelected(answer_list);
    this.classList.add("selected");
    answer = this.innerHTML;
  });
});

function removeSelected(items) {
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove("selected");
  }
}
var completeArr = [];
var correct_img = document.createElement("img");
correct_img.src = "images/tikMark-small.png";
let correct__answer = ["eraser", "ruler", "pencil", "book", "pen"];

let answer__position = document.getElementsByClassName("option");
let arr = Array.from(answer__position);
arr.forEach((ele) => {
  ele.addEventListener("click", function () {
    if (this.innerHTML == "") {
      if (answer && correct__answer.includes(answer)) {
        correct_audio.play();
        ele.innerHTML =
          answer +
          '<img src="https://educationalrc.org/tasks/4/assets/images/tikMark-small.png" width="25px" height="25px">';
        answer = "";
        answer_list.forEach((item) => {
          document.getElementsByClassName("selected")[0].style.visibility =
            "hidden";
        });
        this.classList.add("correct__pos");
        completeArr.push(ele.textContent.toString());
        if (completeArr.length == 5) {
          view__butt.className = "hide";
          view__butt.disabled = true;
          view__butt.style.cursor = "default";
          answer_list.forEach((item) => {
            item.className = "hide";
            item.addEventListener("click", function () {
              removeSelected(answer_list);
              answer = "";
            });
          });
        }
      } else if (answer) {
        incorrect_audio.play();
        ele.innerHTML =
          answer +
          '<img src="https://educationalrc.org/tasks/4/assets/images/crossMark-small.png" width="25px" height="25px">';
        const myTimeout = setTimeout(function () {
          ele.innerHTML = "";
        }, 1000);
      }
    }
  });
});
// --------------------------------------------------------
// view button
let view__butt = document.getElementById("view");
let view__correct = document.getElementsByClassName("view__correct");
let view_arr_correct = Array.from(view__correct);
view__butt.onclick = function () {
  this.className = "hide";
  this.style.cursor = "default";
  for (let j = 0; j < 5; j++) {
    arr[j].innerHTML =
      correct__answer[j] +
      '<img src="https://educationalrc.org/tasks/4/assets/images/tikMark-small.png" width="25px" height="25px">';
  }
  view_arr_correct.forEach((ele) => {
    ele.style.visibility = "hidden";
  });
  answer_list.forEach((item) => {
    item.className = "hide";
    item.addEventListener("click", function () {
      removeSelected(answer_list);
      answer = "";
    });
  });
};
//refresh button
let refresh__butt = document.getElementById("refresh");
refresh__butt.onclick = function () {
  removeSelected(answer_list);
  view__butt.disabled = false;
  view__butt.style.cursor = "pointer";
  answer_list.forEach((item) => {
    item.classList.remove("hide");
  });
  view__butt.classList.remove("hide");
  arr.forEach((ele) => {
    ele.innerHTML = "";
    view_arr_correct.forEach((ele) => {
      ele.style.visibility = "visible";
    });
  });
  answer_list.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.add("selected");
      answer = this.innerHTML;
    });
  });
};
// ---------------------------------------------
var header__resourse = document.getElementById("header__resourse");
var header__help = document.getElementById("header__help");

header__resourse.onclick = function () {
  console.log("say hello");
  create__popup();
  //////////// close popup //////////////////
};
header__help.onclick = function () {
  create__popup__withoutimg();
};
let create__popup = function () {
  //create overlay element
  var layout = document.createElement("div");
  layout.className = "popup";
  document.body.appendChild(layout);
  var popupbox = document.createElement("div");
  popupbox.className = "popup-box";

  //create close span
  var closebutton = document.createElement("span");
  var ex = document.createTextNode("x");
  closebutton.appendChild(ex);
  closebutton.className = "ex-span";
  popupbox.appendChild(closebutton);
  // create img
  var popupimg = document.createElement("img");
  popupimg.src = "https://educationalrc.org/tasks/4/assets/images/dummy.jpg";
  // --------------------------------------------------------------------------------------
  popupbox.appendChild(popupimg);
  document.body.appendChild(popupbox);
  // ----------------------------------------------
  closebutton.onclick = function () {
    layout.style.display = "none";
    popupbox.style.display = "none";
  };
};
let create__popup__withoutimg = function () {
  var layout = document.createElement("div");

  layout.className = "popup";

  document.body.appendChild(layout);

  var popupbox = document.createElement("div");

  popupbox.className = "popup-box";

  //create close span
  var closebutton = document.createElement("span");
  var ex = document.createTextNode("x");
  closebutton.appendChild(ex);
  closebutton.className = "ex-span";
  popupbox.appendChild(closebutton);
  // create img
  var popuph3 = document.createElement("h3");
  popuph3.innerHTML = "Help content goes here.";
  // --------------------------------------------------------------------------------------
  popupbox.appendChild(popuph3);
  document.body.appendChild(popupbox);
  // ----------------------------------------------
  closebutton.onclick = function () {
    layout.style.display = "none";
    popupbox.style.display = "none";
  };
};