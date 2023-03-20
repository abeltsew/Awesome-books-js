/* eslint-disable array-callback-return */
const books = [
  {
    title: 'lorem ipsum',
    author: 'Testeroo Testyy',
  },
];

function addBook(item) {
  books.push(item);
}

function removeBook(item) {
  books.filter((book) => book.title !== item.title);
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
      <div><button>Remove</button></div>
      <hr>
    `;
    container.appendChild(book);
  });
}

// Inital render
render();

const title = document.getElementById('title');
const author = document.getElementById('author');

const add = document.querySelector('.add');

add.addEventListener('click', (e) => {
  e.preventDefault;
  afterRefresh(() => addBook({ title: title.value, author: author.value }));
});
