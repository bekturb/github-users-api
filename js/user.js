class UserInfo {
    constructor() {
        this.classNameActive = 'user--results__data--active--star__active'
    }

    handleSetLocationStatic(element, id, avatar, login, url) {
        const card = {
            id, avatar, login, url,
        }
        const {pushUsers, users} = favoritesUtils.putUsers(card)

        if (pushUsers){
            element.classList.add(this.classNameActive)
        }else{
            element.classList.remove(this.classNameActive)
        }
        header.render(users.length)
    }

    handleClosePage() {
        ROOT__BASKET.innerHTML = ''
    }

    render(card) {


        const usersStore = favoritesUtils.getUsers();
        const errorItem = document.querySelector('.user--result__error')
        let catalog = ''
        let mainCatalog = ''

        let activeClass = '';
        const findIndex = usersStore.find(el => el.id === card.id)

        if (findIndex) {
            activeClass = ' user--results__data--active--star__active';
        } else {
            activeClass = ''
        }

        mainCatalog += `
            <div class="user--results__data">
                    <div class="user--results__data--info">
                        <img class="user--results__data--info__img" src="${card.avatar}" alt="">
                        <div class="user--results__data--user">
                            <h3 class="user--results__data--user__name">${card.login}</h3>
                            <a class="user--results__data--user__link" href="${card.mainUrl}">${card.mainUrl}</a>
                        </div>
                    </div>
                    <div class="user--results__data--active">
                        <span class="user--results__data--active--star ${activeClass}" onclick="userInfo.handleSetLocationStatic(this, ${card.id}, \'${card.avatar}', \'${card.login}\',\'${card.url}\')"><i class="fa-solid fa-star"></i></span>
                        <div class="user--results__data--active--button">
                            <a href="${card.mainUrl}" class="user--results__data--active--button--btn">Show repisitories</a>
                        </div>
                    </div>`


        fetch(`https://api.github.com/users/${card.login}/repos`)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw Error('ERROR')
                } else {
                    return response.json()
                }

            })
            .then((data) => {
                console.log(data, 'jjj')


                if (data === 0) {
                }
                renderUsers(data)
                errorItem.innerHTML = ''
            })

            .catch((error) => {
                errorItem.innerHTML = error;
            })


        function renderUsers(users) {
            users.map(el => {

                console.log(el.name)

                catalog += `
         <div class="user__repos">
                        <h3 class="user__repos--title">${el.name}</h3>
                        <div class="user__repos--button">
                            <a href="${el.html_url}" class="user__repos--button__btn">Go to Github</a>
                        </div>
            </div>
        `


            })

            ROOT__BASKET.innerHTML = `
<div class="userContainer">
             <div class="container">
        <div class="user">
            <div class="user--results" id="user--result">
            <h2 class="user--result__title">User Info</h2>
                    <div class="user--result__error"></div>
                <div onclick="userInfo.handleClosePage()" class="user--results__close"><i class="fa-solid fa-x"></i></div>
            </div>

            <div class="main--catalog">
            ${mainCatalog}
</div>
<div class="user--catalog">
${catalog}
</div>
            </div>
        </div>
    </div>
    </div>

            `
        }

    }


}

// }

const userInfo = new UserInfo();
// userInfo.render()