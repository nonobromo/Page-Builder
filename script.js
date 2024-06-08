const page = document.querySelector("#page");
const clearBtn = document.querySelector("#clear-btn");
const gameAlert = document.querySelector(".game-alert");

let type, params;

const elementSelect = {
    title: [
        'headings',
        'color',
        'content',
        'width',
        'height',
        'bg-color',
    ],
    p: [
        'color',
        'font-size',
        'content',
        'width',
        'height',
        'bg-color',
        'shadow-stats',
    ],
    input: [
        'input-type',
        'color',
        'font-size',
        'content',
        'width',
        'height',
        'bg-color',
    ],
    button: [
        'color',
        'font-size',
        'content',
        'width',
        'height',
        'bg-color',
    ]
}

function changeBg(elem) {
    page.style.backgroundColor = elem.value;
}

function changePad(elem) {
    page.style.padding = elem.value + "px";
}

function changeScreen(id, elem) {
    document.querySelector('nav a.active').classList.remove('active');
    elem.classList.add('active');

    document.querySelector('#panelside>div.show').classList.remove('show');
    document.getElementById(id).classList.add('show');
}

function showParams(elem) {

    type = elem.value;
    params = elementSelect[type];

    const divHide = document.querySelectorAll('#parameters>div');

    for (const divs of divHide) {
        divs.classList.remove('show');
    }

    for (const p of params) {
        document.getElementById(p).classList.add('show');
    }
}
function addEl() {
    let tagName = type;

    if (type === 'title') {
        tagName = document.querySelector('#headings select').value;
    }

    const elem = document.createElement(tagName);

    const inputType = document.querySelector('#input-type select').value;
    const fontSize = document.querySelector('#font-size input').value;
    const textColor = document.querySelector('#color input').value
    const textAdd = document.querySelector('#content input').value;
    const backgroundColorAdd = document.querySelector("#bg-color input").value;

    // Width And Height for elements
    const elemWidth = document.querySelector("#width input").value;
    const elemHeight = document.querySelector("#height input").value;

    //Box Shadow Parameters
    const shadowX = document.querySelector("#shadowX").value;
    const shadowY = document.querySelector("#shadowY").value;
    const shadowBg = document.querySelector("#shadowBg").value;

    for (const p of params) {
        if (p === 'input-type') {
            elem.type = inputType;
        } else if (p === 'font-size') {
            elem.style.fontSize = fontSize + "px";
        } else if (p === 'color') {
            elem.style.color = textColor;
        } else if (p === 'content') {
            if (type === 'input') {
                elem.value = textAdd
            } else {
                elem.innerHTML = textAdd;
            }
        } else if (p === 'width') {
            elem.style.width = elemWidth + "px";
        } else if (p === "height") {
            elem.style.height = elemHeight + "px";
        } else if (p === "shadow-stats") {
            elem.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBg}`;
        } else if (p === "bg-color") {
            elem.style.backgroundColor = backgroundColorAdd;
        }
    }
    elem.classList.add("added-el");
    page.appendChild(elem);
}

document.querySelector("#elements > button:nth-child(4)").addEventListener("click", function () {
    savePage();
})

function savePage() {
    const ellArr = []

    const elems = document.querySelectorAll(".added-el");

    for (const el of elems) {
        ellArr.push(el.outerHTML);
    }
    localStorage.setItem("els", JSON.stringify(ellArr));
    localStorage.style = page.attributes.style?.value;
    gameAlert.innerHTML = "Page Saved";
    alertMsg();
}

clearBtn.addEventListener("click", clearPage);


function clearPage() {
    page.removeAttribute("style");
    page.innerHTML = "";
    localStorage.clear();
    gameAlert.innerHTML = "Page Cleared";
    alertMsg();
}

function alertMsg() {
    setTimeout(() => {
        gameAlert.style.transform = "translateY(0px)";
        gameAlert.style.transition = "400ms";
    }, 10)

    setTimeout(() => {
        gameAlert.style.transform = "translateY(-100px)";
        gameAlert.style.transition = "400ms";
    }, 2000)
}

function init() {
    if (localStorage.els) {
        const addedEl = JSON.parse(localStorage.els);
        for (const add of addedEl) {
            document.querySelector("#page").innerHTML += add;
        }
        page.setAttribute('style', localStorage.style || '');
    }
}

window.addEventListener("load", init);