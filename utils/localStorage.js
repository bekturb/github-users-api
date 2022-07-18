


class LocalStorage {
    constructor() {
        this.keyname = 'users'
    }

    getUsers(){
        const usersLocalStorage = localStorage.getItem(this.keyname);
        if (usersLocalStorage !== null){
            return JSON.parse(usersLocalStorage);
        }
        return [];
    }

    putUsers(obj){
        let users = this.getUsers();
        let pushUsers = false;
        const id = obj.id

        const index = users.find(el => el.id === id)

        if (index){
            users = users.filter(el => el.id !== id)
        }else{
            users.push(obj)
            pushUsers = true
        }
        localStorage.setItem(this.keyname, JSON.stringify(users));

        return {
            pushUsers, users
        }
    }
}
const favoritesUtils = new LocalStorage();
