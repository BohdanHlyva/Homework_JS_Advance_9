let getS = (selector) => document.querySelector(selector);
let allInput = document.querySelectorAll("input");
let regExpFirst = /^[a-zA-Z0-9]{2,20}$/;
let regExpSecond = /^[a-zA-z0-9]{8,15}$/;
let regExpThird = /^[\w\.\-]{1,}@\w{1,}\.\w{2,7}$/;
function validFirst() {
    let a = regExpFirst.test(getS('#login').value);
    if (a == false) {
        getS('#login').classList.add('false');
        getS('#login').style.boxShadow = 'none';
    }
    else {
        getS('#login').classList.add('true');
        getS('#login').classList.remove('false');
    }
}
function validSecond() {
    let a = regExpSecond.test(getS('#password').value);
    if (a == false) {
        getS('#password').classList.add('false');
        getS('#password').style.boxShadow = 'none';
    }
    else {
        getS('#password').classList.add('true');
        getS('#password').classList.remove('false');
    }
}
function validThird() {
    let a = regExpThird.test(getS('#email').value);
    if (a == false) {
        getS('#email').classList.add('false');
        getS('#email').style.boxShadow = 'none';
    }
    else {
        getS('#email').classList.add('true');
        getS('#email').classList.remove('false');
    }
}
function test() {
    if (getS('.ourForm').contains(getS(".false")) == false && (allInput[0], allInput[1], allInput[2]).value != '') {
        addUser();
    }
}
let allDates = [];
function addUser() {
    class User {
        constructor(login, password, email) {
            this.login = login;
            this.password = password;
            this.email = email;
        }
    }
    let user = new User(getS('#login').value, getS('#password').value, getS('#email').value);
    allDates.push(user);
    getS('#login').value = '';
    getS('#password').value = '';
    getS('#email').value = '';
    getS('#login').classList.remove('true');
    getS('#password').classList.remove('true');
    getS('#email').classList.remove('true');
    render();
}
function render() {
    let k = 1;
    while (getS('table').children.length > k) {
        getS('table').children[k].remove();
    }
    k++;
    let i = 0;
    while (i < allDates.length) {
        let table = document.querySelector('table');
        let tr = document.createElement("TR");
        tr.setAttribute('id', `${i}`);
        let td1 = document.createElement("TD");
        td1.textContent = i + 1;
        td1.setAttribute('class', 'counter');
        let td2 = document.createElement("TD");
        td2.textContent = allDates[i].login;
        let td3 = document.createElement("TD");
        td3.textContent = allDates[i].password;
        let td4 = document.createElement("TD");
        td4.textContent = allDates[i].email;
        let td5 = document.createElement("TD");
        td5.innerHTML = (`<input type="button" value="Edit" class="edit" onclick="editUser(${i})">`);
        let td6 = document.createElement("TD");
        td6.innerHTML = (`<input type="button" value="Delete" class="delete" onclick="deleteUser(${i})">`);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        table.appendChild(tr);
        i++;
    }
    k = 0;
}
function deleteUser(value) {
    allDates.splice(value, 1);
    getS('.editB').style.display = 'none';
    getS('.addB').style.display = 'block';
    render();
}
let userIndex;
function editUser(value) {
    let ourValues = allDates[value];
    userIndex = value;
    getS('#login').value = ourValues.login;
    getS('#password').value = ourValues.password;
    getS('#email').value = ourValues.email;
    getS('.editB').style.display = 'block';
    getS('.addB').style.display = 'none';
}
function saveEditUser() {
    if (getS('.ourForm').contains(getS(".false")) == false && (allInput[0], allInput[1], allInput[2]).value != '') {
        class User {
            constructor(login, password, email) {
                this.login = login;
                this.password = password;
                this.email = email;
            }
        }
        let user = new User(getS('#login').value, getS('#password').value, getS('#email').value);
        allDates.splice(userIndex, 1, user);
        getS('.editB').style.display = 'none';
        getS('.addB').style.display = 'block';
        getS('#login').value = '';
        getS('#password').value = '';
        getS('#email').value = '';
        getS('#login').classList.remove('true');
        getS('#password').classList.remove('true');
        getS('#email').classList.remove('true');
        render();
    }
}
