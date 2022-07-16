

class Header {
    constructor() {
    }

    render(count){
        const header  =
            `  <div class="container">
        <div class="header">
                <a class="header--logo" href="">Github Users</a>
            <div class="header--corner">
                <button class="header--corner__search">Search</button>
                <button class="header--corner__favorites">Favorites <span class="header--corner__favorites--count">${count}</span></button>
            </div>
        </div>
    </div>`;

      const headerPage  = document.getElementById('header')
        headerPage.innerHTML = header
    }
}

const header = new Header();

const userStore = favoritesUtils.getUsers();
header.render(userStore.length)
