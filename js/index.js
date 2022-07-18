class Users{
    constructor() {
        this.classNameActive = 'hero--results__data--active--star__active'
    }

    handleSetLocationStorage(element,id,avatar,login,url){

        const obj = {
            id, avatar, login, url,
        }
       const {pushUsers, users} = favoritesUtils.putUsers(obj)

        if (pushUsers){
            element.classList.add(this.classNameActive)
        }else{
            element.classList.remove(this.classNameActive)
        }
        header.render(users.length)
        console.log(obj)
    }

    handleAddUser (id,avatar,login,url) {
        const cart = {
            id,avatar,login,url
        }

        console.log(cart,'sjsjsj')
        userInfo.render(cart)
    }


    render(){

        const usersStore = favoritesUtils.getUsers();

        const baseUrl = 'https://api.github.com/search/users?q='
        const heroResults = document.querySelector('.hero--results')
        const errorItem = document.querySelector('.hero--result__error')
        // const star = document.querySelector('.hero--results__data--active--star')
        // const heroTitle = document.querySelector('.hero--result__title')



        let allResult = {
            name: 'bekturb',
            sort: 'followers',
            order: 'desc',
            perPage: 4,
            pagination: 1,

        };

        console.log(allResult)
        function addResultUser (el) {
            allResult.name = el
        }

        function addResultSort(el) {
            allResult.sort = el
        }

        function addResultOrder(el) {
            allResult.order = el
        }

        function addResultPerPage(el) {
            allResult.perPage = el
        }

        function addResultPagination(el) {
            allResult.pagination = el
        }

        function addResultPrev() {
            allResult.pagination = allResult.pagination > 1 ? allResult.pagination - 1 : allResult.pagination
        }

        function addResultNext() {
            allResult.pagination = allResult.pagination + 1
        }




        function searchUsers(users = 'a') {

            fetch(`${baseUrl}${allResult.name}&sort=${allResult.sort}&order=${allResult.order}&per_page=${allResult.perPage}&page=${allResult.pagination}`)
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        throw Error('ERROR')
                    } else {
                        return response.json()
                    }

                })
                .then((data) => {
                    console.log(data)
                    const resultsUser = data.items


                    if (resultsUser === 0){
                    }
                    renderResults(resultsUser)
                    errorItem.innerHTML = ''
                })

                .catch((error) => {
                    errorItem.innerHTML = error;
                })



            function renderResults(result) {
                heroResults.innerHTML = '';
                result.forEach(({id,avatar_url,html_url, login}) => {

                    let activeClass = '';
                    const findIndex = usersStore.find(el => el.id === id)

                    if (findIndex){
                        activeClass = ' hero--results__data--active--star__active';
                    }else {
                        activeClass = ''
                    }


                        heroResults.innerHTML += `
            <div class="hero--results__data">
                    <div class="hero--results__data--info">
                        <img class="hero--results__data--info__img" src="${avatar_url}" alt="">
                        <div class="hero--results__data--user">
                            <h3 class="hero--results__data--user__name">${login}</h3>
                            <a class="hero--results__data--user__link" href="${html_url}">${html_url}</a>
                        </div>
                    </div>
                    <div class="hero--results__data--active">
                        <span class="hero--results__data--active--star ${activeClass}" onclick="usersPage.handleSetLocationStorage(this, ${id}, \'${avatar_url}', \'${login}\',\'${html_url}\')"><i class="fa-solid fa-star"></i></span>
                        <div class="hero--results__data--active--button">
                            <a href="../../zeon-js-github/user.html" class="hero--results__data--active--button--btn" onclick="usersPage.handleAddUser(${id}, \'${avatar_url}', \'${login}\',\'${html_url}\')">Show repisitories</a>
                        </div>
                    </div>`


                })

            }
        }


        let searchTimoutToken = 0;

        window.onload = () => {

            const sortSelect = document.getElementById('hero--sort')
            const heroOrder = document.getElementById('hero--order')
            const heroPerPage = document.getElementById('hero--perPage')
            const paginationInput = document.getElementById('pagination__input')
            const prevButton = document.querySelector('.pagination__prev')
            const nextButton = document.querySelector('.pagination__next')

            sortSelect.addEventListener('change', () => {
                addResultSort(sortSelect.value)
                searchUsers()
            })


            heroOrder.addEventListener('change', () => {
                addResultOrder(heroOrder.value)
                searchUsers()
            })

            heroPerPage.addEventListener('change', () => {
                addResultPerPage(heroPerPage.value)
                searchUsers()
            })


            paginationInput.addEventListener('change', () => {
                addResultPagination(paginationInput.value)
                searchUsers()
            })

            prevButton.addEventListener('click', () => {
                addResultPrev()
                searchUsers()
            })

            nextButton.addEventListener('click', () => {
                addResultNext()
                searchUsers()
            })

            const search = document.getElementById('hero--sorted__users--user')
            search.onkeyup = (event) => {

                clearTimeout(searchTimoutToken)

                searchTimoutToken = setTimeout(() => {
                    addResultUser(search.value)
                    searchUsers()
                }, 500)
            }
        }
    }
}

const usersPage = new Users();
usersPage.render();