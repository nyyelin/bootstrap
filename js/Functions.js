function save(storageName, obj) {
    localStorage.setItem(storageName, JSON.stringify(obj));
}

function get(user = '', storage = 'users') {
    let data = localStorage.getItem(storage);

    if (!data) {
        return false;
    } else {
        let obj = JSON.parse(data);
       
        if (user == '') {
            return obj;
        } else {
            if (!obj.hasOwnProperty(user)) return false;
            return obj[user];
        }
    }
}

function include(usr) {
    let obj = get();
    if (obj.hasOwnProperty(usr)) return true;
    else return false;
}

function includeEmail(email) {
    let obj = get();
    for (const users in obj) {
        if (obj[users].email == email) return users;
    }
    return false;
}

function isStorageEmpty() {
    let data = localStorage.getItem('users');
    if (!data) return true;
    else return false;
}

function getCurUsr() {
    return Object.keys(get('', 'cur_usr'))[0];
}

function setCurUsr(usr) {
    save('cur_usr', { [usr]: {} });
}

function addScore({ sub, mark, user }) {
    let obj = get();

    if (!obj) {
        return false;
    }
    if (!obj[user].subject.hasOwnProperty(sub)) {
        obj[user].subject[sub] = [mark,];
    } else {
        obj[user].subject[sub].push(mark);
    }

    save('users', obj);
    return true;
}

function create({ usr, storage = 'users', mail = '', pwd = '', sub = '', cn = '', cvv = '', lvl = '' }) {
    console.log(usr);
    console.log(get(usr));
    if (isStorageEmpty()) {
        console.log('new');
        let obj = {
            [usr]: {
                email: mail,
                password: pwd,
                subject: {},
                creditNo: cn,
                cvv: cvv,
                level: lvl,
            },
        };

        console.log(obj);
        save(storage, obj);
    } else {
        let obj = get();

        obj[usr] = {
            email: mail,
            password: pwd,
            subject: {},
            creditNo: cn,
            cvv: cvv,
            level: lvl,
        };
        console.log(obj);
        save(storage, obj);
    }
}

function update() {
    // comming soon
}