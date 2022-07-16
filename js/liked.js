

class Liked {


    render() {
        const usersStore = favoritesUtils.getUsers();

        result.forEach(({id,avatar_url, login,url}) => {

            let activeClass = '';

            if (usersStore.indexOf(id) === -1){
                activeClass = ''
            }else {
                activeClass = ' hero--results__data--active--star__active';
            }

            heroResults.innerHTML += `
            <div class="hero--results__data">
                    <div class="hero--results__data--info">
                        <img class="hero--results__data--info__img" src="${avatar_url}" alt="">
                        <div class="hero--results__data--user">
                            <h3 class="hero--results__data--user__name">${login}</h3>
                            <a class="hero--results__data--user__link" href="${url}">${url}</a>
                        </div>
                    </div>
                    <div class="hero--results__data--active">
                        <span class="hero--results__data--active--star  ${activeClass}" onclick="usersPage.handleSetLocationStorage(this, ${id})"><i class="fa-solid fa-star"></i></span>
                        <div class="hero--results__data--active--button">
                            <button class="hero--results__data--active--button--btn">Show repisitories</button>
                        </div>
                    </div>`
        })
    }
}

