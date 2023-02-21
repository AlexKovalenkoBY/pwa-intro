// file: render.js

function renderHello() {
    const template = document.getElementById('template').innerHTML;
    const rendered = Mustache.render(template, { name: 'Luke!!!~~!' });
    document.getElementById('target').innerHTML = rendered;
}