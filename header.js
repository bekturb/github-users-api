

class Header {


    render (count) {

        const header = document.getElementById('header')

        header.innerHTML = `
         <div class="container">
        <div class="header">
            <a class="header--logo" href="">Github Users</a>
            <div class="header--corner">
                <a href="index.html" class="header--corner__search">Search</a>
                <a onclick="favorites.render()" href="fav.html" class="header--corner__favorites">Favorites<span class="header--corner__favorites--count">${count}</span></a>
            </div>
        </div>
    </div>
        `
    }
}

const header = new Header();

const userStore = favoritesUtils.getUsers();
header.render(userStore.length)