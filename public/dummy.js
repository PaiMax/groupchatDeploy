const openButton = document.getElementById('openButton');
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('overlay');

openButton.addEventListener('click', () => {
    overlay.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});
