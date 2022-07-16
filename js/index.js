const baseUrl = 'https://api.github.com/search/users?q='


const heroResults = document.querySelector('.hero--results')
const errorItem = document.querySelector('.hero--result__error')
// const heroTitle = document.querySelector('.hero--result__title')


let allResult = {
    name: '',
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

// }

    function renderResults(result) {
        heroResults.innerHTML = '';
        result.map(el => (
            heroResults.innerHTML += `
            <div class="hero--results__data">
                    <div class="hero--results__data--info">
                        <img class="hero--results__data--info__img" src="${el.avatar_url}" alt="">
                        <div class="hero--results__data--user">
                            <h3 class="hero--results__data--user__name">${el.login}</h3>
                            <a class="hero--results__data--user__link" href="${el.url}">${el.html_url}</a>
                        </div>
                    </div>
                    <div class="hero--results__data--active">
                        <span class="hero--results__data--active--star"><i class="fa-solid fa-star"></i></span>
                        <div class="hero--results__data--active--button">
                            <button class="hero--results__data--active--button--btn">Show repisitories</button>
                        </div>
                    </div>`
        ))
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
        // searchUsers(search.value)

        clearTimeout(searchTimoutToken)

        searchTimoutToken = setTimeout(() => {
            addResultUser(search.value)
            searchUsers()
        }, 500)


    }
}



