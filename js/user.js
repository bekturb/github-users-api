


class UserInfo {
    constructor() {

    }

    render (card) {

        console.log(card)

        const usersStore = favoritesUtils.getUsers();
        const errorItem = document.querySelector('.user--result__error')
        const userResults = document.querySelector('.user--results')



        // function searchRepos() {

            // fetch('https://api.github.com/users/bekturb/repos')
            //     .then(response => {
            //         console.log(response)
            //         if (!response.ok) {
            //             throw Error('ERROR')
            //         } else {
            //             return response.json()
            //         }
            //
            //     })
            //     .then((data) => {
            //         console.log(data)
            //
            //
            //
            //         if (data === 0){
            //         }
            //         renderUsers(data)
            //         errorItem.innerHTML = ''
            //     })
            //
            //     .catch((error) => {
            //         errorItem.innerHTML = error;
            //     })



            // function renderUsers(users) {
            //     userResults.innerHTML = '';
            //     card.forEach(el => {


                    let activeClass = '';
                    const findIndex = usersStore.find(el => el.id === card.id)

                    if (findIndex){
                        activeClass = ' user--results__data--active--star__active';
                    }else {
                        activeClass = ''
                    }



                    userResults.innerHTML += `
            <div class="user--results__data">
                    <div class="user--results__data--info">
                        <img class="user--results__data--info__img" src="${card.avatar}" alt="">
                        <div class="user--results__data--user">
                            <h3 class="user--results__data--user__name">${card.login}</h3>
                            <a class="user--results__data--user__link" href="${card.url}">${card.url}</a>
                        </div>
                    </div>
                    <div class="user--results__data--active">
                        <span class="user--results__data--active--star ${activeClass}" onclick="usersPage.handleSetLocationStorage(this, ${card.id}, \'${card.avatar}', \'${card.login}\',\'${card.url}\')"><i class="fa-solid fa-star"></i></span>
                        <div class="user--results__data--active--button">
                            <a href="../../zeon-js-github/user.html" class="user--results__data--active--button--btn">Show repisitories</a>
                        </div>
                    </div>`


                // })

            }
        // }

    // }

}

const userInfo = new UserInfo();
// userInfo.render()