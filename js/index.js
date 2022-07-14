// window.addEventListener("load", function () {


// const heroSearch = document.querySelector('.hero--sorted')
const heroResults = document.querySelector('.hero--results')
const errorItem = document.querySelector('.hero--result__error')
// const sortSelect = document.getElementById('hero--sort')



//
// sortSelect.addEventListener('change', () => {
//       return sortSelect.value;
// })

// const handleSort = (array) => {
//     console.log(array)
// }
//
// handleSort(strUser)

function searchUsers(users) {
    // console.log(strUser)
    fetch(`https://api.github.com/search/repositories?q=${users}&sort=craeted_at&order=desc`)
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
            renderResults(resultsUser)
            errorItem.innerHTML = ''
        })

        .catch((error) => {
            errorItem.innerHTML = error;
        })
}


// const sortedItemsValue = (array) => {
//     return array
// }



function renderResults(result) {
    heroResults.innerHTML = '';
    result.map(el => (
        heroResults.innerHTML += `
            <div class="hero--results__data">
                    <div class="hero--results__data--info">
                        <img class="hero--results__data--info__img" src="${el.owner.avatar_url}" alt="">
                        <div class="hero--results__data--user">
                            <h3 class="hero--results__data--user__name">${el.name}</h3>
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




let searchTimoutToken = 0;

window.onload = () => {
    const searchUser = document.getElementById('hero--sorted__users--user')
    searchUser.onkeyup = (event) => {

        clearTimeout(searchTimoutToken);

        if (searchUser.value.trim().length === 0) {
            return;
        }

        searchTimoutToken = setTimeout(() => {
            searchUsers(searchUser.value)
        }, 500);
    };
}



