/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
let idCounter = localStorage.getItem('counter')
  ? Number(localStorage.getItem('counter'))
  : localStorage.setItem('counter', 0);

let books = localStorage.getItem('books')
  ? JSON.parse(localStorage.getItem('books'))
  : localStorage.setItem('books', JSON.stringify([]));

function addBook(item) {
  idCounter += 1;
  localStorage.setItem('counter', idCounter);
  books.push({ ...item, id: idCounter });
}

function removeBook(item) {
  books = books.filter((bookItem) => bookItem.id !== Number(item));
}

function afterRefresh(callback) {
  callback();
  render();
  localStorage.setItem('books', JSON.stringify(books));
}

// render
function render() {
  const container = document.querySelector('#books');
  container.innerHTML = '';
  books.map((b) => {
    const book = document.createElement('p');
    book.classList.add('book');
    book.innerHTML = `
      <h5>${b.title}</h5>
      <small>${b.author}</small>
      <div><button book_id="${b.id}" class="remove">Remove</button></div>
      <hr>
    `;

    const remove = book.querySelector('.remove');
    remove.addEventListener('click', () => {
      const id = remove.getAttribute('book_id');
      afterRefresh(() => removeBook(id));
    });

    container.appendChild(book);
  });
}

// Initial book list render
document.addEventListener('DOMContentLoaded', () => render());

const title = document.getElementById('title');
const author = document.getElementById('author');
const add = document.querySelector('.add');

add.addEventListener('click', (e) => {
  e.preventDefault();
  afterRefresh(() => addBook({ title: title.value, author: author.value }));
  title.value = '';
  author.value = '';
});
