let getS = (selector: any) => document.querySelector(selector);
let allInput: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
let regExpFirst: RegExp = /^[a-zA-Z0-9]{2,20}$/;
let regExpSecond: RegExp = /^[a-zA-z0-9]{8,15}$/;
let regExpThird: RegExp = /^[\w\.\-]{1,}@\w{1,}\.\w{2,7}$/;

function validFirst(): void {
    let a: boolean = regExpFirst.test(getS('#login').value);
    if (a == false) {
        getS('#login').classList.add('false');
        getS('#login').style.boxShadow = 'none';
    }
    else {
        getS('#login').classList.add('true');
        getS('#login').classList.remove('false');
    }
}

function validSecond(): void {
    let a: boolean = regExpSecond.test(getS('#password').value);
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
    let a: boolean = regExpThird.test(getS('#email').value);
    if (a == false) {
        getS('#email').classList.add('false');
        getS('#email').style.boxShadow = 'none';
    }
    else {
        getS('#email').classList.add('true');
        getS('#email').classList.remove('false');
    }
}
function test(): void {
    if (getS('.ourForm').contains(getS(".false")) == false && (allInput[0], allInput[1], allInput[2]).value != '') {
        addUser();
    }
}

let allDates: any[] = [];
function addUser() {
    interface IUser {
        login: string;
        password: string;
        email: string;
    }
    class User implements IUser {
        constructor(public login: string, public password: string, public email: string) { }
    }
    let user: IUser = new User(getS('#login').value, getS('#password').value, getS('#email').value);
    allDates.push(user)

    getS('#login').value = ''
    getS('#password').value = ''
    getS('#email').value = ''
    getS('#login').classList.remove('true');
    getS('#password').classList.remove('true');
    getS('#email').classList.remove('true');

    render();
}

function render(): void {
    let k: number = 1;
    while (getS('table').children.length > k) {
        getS('table').children[k].remove();
    }
    k++

    let i: number = 0;
    while (i < allDates.length) {
        let table: HTMLTableElement = document.querySelector('table')
        let tr: HTMLElement = document.createElement("TR");
        tr.setAttribute('id', `${i}`)
        let td1: any = document.createElement("TD");
        td1.textContent = i + 1;
        td1.setAttribute('class', 'counter')
        let td2: HTMLElement = document.createElement("TD");
        td2.textContent = allDates[i].login;
        let td3: HTMLElement = document.createElement("TD");
        td3.textContent = allDates[i].password;
        let td4: HTMLElement = document.createElement("TD");
        td4.textContent = allDates[i].email;
        let td5: HTMLElement = document.createElement("TD");
        td5.innerHTML = (`<input type="button" value="Edit" class="edit" onclick="editUser(${i})">`)
        let td6: HTMLElement = document.createElement("TD");
        td6.innerHTML = (`<input type="button" value="Delete" class="delete" onclick="deleteUser(${i})">`)

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        table.appendChild(tr);
        i++
    }
    k = 0;
}

function deleteUser(value: number) {
    allDates.splice(value, 1)
    getS('.editB').style.display = 'none';
    getS('.addB').style.display = 'block';

    render();
}

let userIndex: number;
function editUser(value: number) {
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
        interface IUser {
            login: string;
            password: string;
            email: string;
        }

        class User implements IUser {
            constructor(public login: string, public password: string, public email: string) { }
        }
        let user: IUser = new User(getS('#login').value, getS('#password').value, getS('#email').value);
        allDates.splice(userIndex, 1, user)

        getS('.editB').style.display = 'none';
        getS('.addB').style.display = 'block';
        getS('#login').value = ''
        getS('#password').value = ''
        getS('#email').value = ''
        getS('#login').classList.remove('true');
        getS('#password').classList.remove('true');
        getS('#email').classList.remove('true');

        render();
    }
}
