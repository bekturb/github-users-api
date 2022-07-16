


class Favorites {
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


    putUsers(id){
        let users = this.getUsers();
        let pushUsers = false
        const index = users.indexOf(id)

        if (index === -1){
            users.push(id);
            pushUsers = true;
        } else{
            users.splice(index,1)
        }

        localStorage.setItem(this.keyname, JSON.stringify(users));


        return { pushUsers, users }

    }
}

const favorites = new Favorites();


favorites.putUsers('el3')
favorites.putUsers('el1')