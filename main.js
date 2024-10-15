const tarefa = $("#tarefa");
const ul = $("ul");
let oldInputValue;
let menuOpen = false;
let editOpen = false;

$("form").submit((e)=>{
    e.preventDefault();

    criarTarefa(ul);
    $(tarefa.val(''));
});

$(document).click((e)=>{
    const targetE = e.target;
    const parentE = targetE.closest("li");

    if(targetE.classList.contains("open-menu")){
        let sonP = parentE.children[1];

        menuDownUp(sonP);
    };

    if(targetE.classList.contains("check")){
        let sonP = parentE.children[0];
        $(sonP).toggleClass("checked");
    };

    if(targetE.classList.contains("edit")){
        tarefaEdit(parentE);
    };

    if(targetE.classList.contains("delete")){
        parentE.remove();

        menuOpen = false;
    };

    if(targetE.classList.contains("close-edit")){
        changeTarefa(targetE, parentE);
    };
});

// function
function criarTarefa(ul){
    const liItem = $("<li></li>");
    createItem(liItem);
    menuItem(liItem);
    menuEdit(liItem);

    ul.append(liItem);
};

function createItem(liItem){
    const h3 = $("<h3></h3>");
    const menuBtn = createBtn("bi bi-list", "open-menu");

    h3.append(tarefa.val());
    h3.append(menuBtn);

    liItem.append(h3);
};

function menuItem(liItem){
    const menuBtns = $("<div></div>");
    const checkBtn = createBtn("bi bi-check2-square", "check");
    const editBtn = createBtn("bi bi-pencil-square", "edit");
    const deleteBtn = createBtn("bi bi-x-square", "delete");

    menuBtns.addClass("menu");

    menuBtns.append(checkBtn);
    menuBtns.append(editBtn);
    menuBtns.append(deleteBtn);

    liItem.append(menuBtns);
};

function menuEdit(liItem){
    const openEdit = $("<div></div>");
    const h3 = $("<h3></h3>");
    const input = $("<input>");
    const button = createBtn("bi bi-check-square", "close-edit");

    h3.append("Edite sua tarefa");

    openEdit.addClass("edit-open");

    openEdit.append(h3);
    openEdit.append(input);
    openEdit.append(button);

    liItem.append(openEdit);
};

function createBtn(iconString, classBtn){
    const btn = $("<button></button");
    const icon = $("<i></i>");
    btn.addClass(classBtn);
    icon.addClass(iconString);

    btn.append(icon);

    return btn
};

function menuDownUp(sonP){
    if((menuOpen === false)&&($(sonP).css("display") === "none")){
        $(sonP).slideDown();
        
        menuOpen = true;
    }else if((menuOpen === true)&&($(sonP).css("display") === "block")&&(editOpen === false)){
        $(sonP).slideUp();

        menuOpen = false;
    };
};

function tarefaEdit(parentE){
    let fatherE = parentE.children[2];
    let sonP = parentE.children[0];
    let input = fatherE.children[1];

    oldInputValue = $(sonP).text();

    $(input).val(oldInputValue);

    $(fatherE).slideDown();
    editOpen = true;
};

function changeTarefa(targetE, parentE){
    const menuBtn = createBtn("bi bi-list", "open-menu");
    let fatherE = targetE.closest("div");
    let sonP = parentE.children[0];
    let input = fatherE.children[1];
    let novaTarefa = $(input).val();

    $(oldInputValue).text($(sonP).text());

    if($(input).val() === ''){
        $(sonP).text(oldInputValue);
        $(sonP).append(menuBtn);
    }else{
        $(sonP).text(novaTarefa);
        $(sonP).append(menuBtn);
    }

    $(fatherE).slideUp();
    editOpen = false;
};
