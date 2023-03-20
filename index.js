/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
let idCounter = 1;

let books = [
  {
    id: 1,
    title: 'lorem ipsum',
    author: 'Testeroo Testyy',
  },
];

function addBook(item) {
  idCounter += 1;
  books.push({ ...item, id: idCounter });
}

function removeBook(item) {
  books = books.filter((bookItem) => bookItem.id !== Number(item));
}

function afterRefresh(callback) {
  callback();
  render();
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

// Inital render
render();

const title = document.getElementById('title');
const author = document.getElementById('author');

const add = document.querySelector('.add');

add.addEventListener('click', (e) => {
  e.preventDefault();
  afterRefresh(() => addBook({ title: title.value, author: author.value }));
});
