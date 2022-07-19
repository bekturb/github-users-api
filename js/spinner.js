

class Spinner{
    constructor() {
    }

    spinnerClear () {
        ROOT__SPINNER.style.display = 'none'
    }

    render () {
        const html  = `
<div class="container">
            <div class="spinner">
    </div>
    </div>
     `


        ROOT__SPINNER.innerHTML = html
}
}

const spinnerPage = new Spinner();
