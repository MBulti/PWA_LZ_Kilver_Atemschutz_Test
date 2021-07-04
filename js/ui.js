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