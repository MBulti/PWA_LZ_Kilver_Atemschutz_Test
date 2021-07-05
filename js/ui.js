const entrys = document.querySelector(".entrys");

document.addEventListener('DOMContentLoaded', function () {
    // M from materialize library

    // nav menu
    let menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, { edge: 'right' });
    // add recipe form
    let forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, { edge: 'left' });
    // combobox inside form
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
});

// render entry data
const renderEntry = (data, id) => {

    const html = `
    <div class="card-panel entry white row" data-id="${id}">
        <img src="./img/default.png" alt="entry thumb">
        <div class="entry-details">
            <div class="entry-title">${data.reason}</div>
            <div class="entry-ingredients">${data.vehicle}</div>
            <div class="entry-ingredients">${data.position}</div>
        </div>
        <div class="entry-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
        </div>
    </div>
    `;
    entrys.innerHTML += html;
};