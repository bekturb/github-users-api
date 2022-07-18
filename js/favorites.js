

class Favorites {

    constructor() {
        this.classNameActive = 'favorites--results__data--active--star__active'
    }

    handleLocalStorage (element,id,avatar,login,url) {

        const cart = {
             id, avatar, login, url,
        }
        const {pushUsers, users} = favoritesUtils.putUsers(cart)

        if (pushUsers){
            element.classList.add(this.classNameActive)
        }else{
            element.classList.remove(this.classNameActive)
        }
        header.render(users.length)
        console.log(cart)

    }


    render() {

        const favoritesResults = document.querySelector('.favorites--results')
        const usersStore = favoritesUtils.getUsers();
        console.log(usersStore)
        renderResults(usersStore)

        function renderResults(result) {
            favoritesResults.innerHTML = '';
            result.forEach(({id,avatar,url, login}) => {


                let activeClass = '';
                const findIndex = usersStore.find(el => el.id === id)

                if (findIndex){
                    activeClass = ' favorites--results__data--active--star__active';
                }else {
                    activeClass = ''
                }

                favoritesResults.innerHTML += `
            <div class="favorites--results__data">
                    <div class="favorites--results__data--info">
                        <img class="favorites--results__data--info__img" src="${avatar}" alt="">
                        <div class="favorites--results__data--user">
                            <h3 class="favorites--results__data--user__name">${login}</h3>
                            <a class="favorites--results__data--user__link" href="${url}">${url}</a>
                        </div>
                    </div>
                    <div class="favorites--results__data--active">
                        <span class="favorites--results__data--active--star ${activeClass}" onclick="favorites.handleLocalStorage(this, ${id}, \'${avatar}', \'${login}\',\'${url}\')"><i class="fa-solid fa-star"></i></span>
                        <div class="favorites--results__data--active--button">
                            <button class="favorites--results__data--active--button--btn" onclick="usersPage.handleAddUser(${id}, \'${avatar}', \'${login}\',\'${url}\')">Show repisitories</button>
                        </div>
                    </div>`
        })
    }
    }
}

const favorites = new Favorites();
favorites.render()

