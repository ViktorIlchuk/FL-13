

const bookStorageKey = 'booksData';
const rootElementSelector = 'root';
const rightContainerSelector = 'right-container';
const leftContainerSelector = 'left-container';
const rootAppContainerSelector = 'root-app-container';
const bookContainerSelector = 'book-container';
const addEditFormButtonContainer = 'add-edit-form-button-container';

function loadDataIntoStorage() {
  if(!localStorage.getItem(bookStorageKey)) {
    localStorage.setItem(bookStorageKey, JSON.stringify());
  }  
}

function getBooksFromStorage() {
	
	
	loadDataIntoStorage();
	return;
}

function getRootElement() {
	return document.getElementById(rootElementSelector);
}

function loadBooksInfoOnUI() {
  const books = getBooksFromStorage();
  const leftContainer = document.getElementById(leftContainerSelector);
  
  for(let i=0; i<books.length; i++) {
    let bookContainer = document.createElement('div');
    bookContainer.classList.add(bookContainerSelector);
    let bookInfoContainer = document.createElement('div');
    bookInfoContainer.style.cursor = 'pointer';
    bookInfoContainer.id = books[i].id;
    bookInfoContainer.innerHTML = books[i].name;
    bookInfoContainer.addEventListener('click', function() {
      window.location.assign(window.location.href.split('/index.html')[0] 
        + `/index.html?id=${books[i].id}#preview`);
    });

    let editButton = document.createElement('button');
    editButton.innerHTML = 'Edit'
    editButton.addEventListener('click', function() {
      window.location.assign(window.location.href.split('/index.html')[0] 
        + `/index.html?id=${books[i].id}#edit`);
    })
    bookContainer.appendChild(editButton);

    bookContainer.appendChild(bookInfoContainer);
    leftContainer.appendChild(bookContainer);	
  }

  let addButton = document.createElement('button');
  addButton.innerHTML = 'Add Book';
  addButton.addEventListener('click', function() {
    window.location.assign(window.location.href.split('/index.html')[0] 
      + `/index.html#add`);
  })
  addButton.classList.add('add-button');

  leftContainer.appendChild(addButton);	
}

function createAppContainer() {
  let rootElement = getRootElement();

  let container = document.createElement('div');
  container.classList.add('main-container');
  container.id = rootAppContainerSelector;

  rootElement.appendChild(container);

  let leftContainer = document.createElement('div');
  leftContainer.classList.add(leftContainerSelector);
  leftContainer.id = leftContainerSelector;

  let rightContainer = document.createElement('IFRAME');
  rightContainer.id = 'bookInfoFrame';
  rightContainer.classList.add(rightContainerSelector);

  rightContainer.onload = function() {
    let urlParams = parseQueryString();
    if(window.location.hash.toString() === '#preview') {
      openBookForPreview(urlParams['id']);
    }
    if(window.location.hash.toString() === '#edit') {
      openBookForEdit(urlParams['id']);
    }
    if(window.location.hash.toString() === '#add') {
      openBookForEdit();
    }
  }

  container.appendChild(leftContainer);
  container.appendChild(rightContainer);
  let html = '<html><head></head><body></body></html>';
  rightContainer.contentWindow.document.write(html);
  let link = document.createElement('link');
  link.href = 'styles.css';
  link.rel = 'stylesheet'; 
  link.type = 'text/css'; 
  rightContainer.contentWindow.document.head.appendChild(link);
}

function getBookById(bookId) {
  const books = getBooksFromStorage();
  for(let i=0; i<books.length; i++) {
    if(books[i].id === bookId) {
      return books[i];
    }
  }
  return null;
}

function openBookForPreview(bookId) {
  const bookToShow = getBookById(bookId);
  
  const rightContainer = document.getElementById('bookInfoFrame');
  rightContainer.src = window.location.href.split('/index.html')[0] 
  + `/index.html?id=${bookToShow.id}`;
  
  const containerToAdd = document.getElementById(rootAppContainerSelector);
  containerToAdd.appendChild(rightContainer);
  let html = '<html><head></head><body></body></html>';
  rightContainer.contentWindow.document.write(html);

  let ifrDoc = rightContainer.contentDocument;
  
  let previewInfoContainer = createPreviewForm(bookToShow);

  ifrDoc.body.appendChild(previewInfoContainer);

  resizeIFrameToFitContent(rightContainer);
}

function openBookForEdit(bookId) {
  const bookToShow = getBookById(bookId);

  const rightContainer = document.getElementById('bookInfoFrame');
  rightContainer.src = bookToShow ? window.location.href.split('/index.html')[0] 
    + `/index.html?id=${bookToShow.id}` : window.location.href.split('/index.html')[0] 
    + `/index.html#add`;

  const containerToAdd = document.getElementById(rootAppContainerSelector);
  containerToAdd.appendChild(rightContainer);
  let html = '<html><head></head><body></body></html>';
  rightContainer.contentWindow.document.write(html);

  let ifrDoc = rightContainer.contentDocument;
  
  let previewInfoContainer = createAddEditForm(bookToShow);

  ifrDoc.body.appendChild(previewInfoContainer);

  resizeIFrameToFitContent(rightContainer);
}

function resizeIFrameToFitContent(iFrame) {
  iFrame.width = "800px";
  iFrame.height = "800px";
}

function createPreviewForm(bookToShow) {
  let previewInfoContainer = document.createElement('div');

  let nameDiv = document.createElement('h3');
  nameDiv.innerHTML = bookToShow.name;
  previewInfoContainer.appendChild(nameDiv);

  let authorDiv = document.createElement('h4');
  authorDiv.innerHTML = bookToShow.author;
  previewInfoContainer.appendChild(authorDiv);

  var bookImage = document.createElement("img");
  bookImage.src = bookToShow.imageUrl;
  previewInfoContainer.appendChild(bookImage);

  let plotDiv = document.createElement('div');
  plotDiv.innerHTML = "PLOT:" + bookToShow.plot;
  plotDiv.width = "500px";
  previewInfoContainer.appendChild(plotDiv);

  return previewInfoContainer;
}

function createAddEditForm(bookToEdit) {
  let addEditContainer = document.createElement('div');
  addEditContainer.classList.add('add-edit-form-container');

  let nameHeader = document.createElement('div');
  nameHeader.innerHTML = 'Book name:'
  addEditContainer.appendChild(nameHeader);
  nameHeader.classList.add('label-book-prop');
  let nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.required = true;
  nameInput.value = bookToEdit ? bookToEdit.name : '';
  addEditContainer.appendChild(nameInput);
  nameInput.classList.add('input-book-prop');

  let authorHeader = document.createElement('div');
  authorHeader.innerHTML = 'Author:'
  addEditContainer.appendChild(authorHeader);
  authorHeader.classList.add('label-book-prop');
  let authorInput = document.createElement('input');
  authorInput.type = 'text';
  authorInput.required = true;
  authorInput.value = bookToEdit ? bookToEdit.author : '';
  addEditContainer.appendChild(authorInput);
  authorInput.classList.add('input-book-prop');

  let imageUrlHeader = document.createElement('div');
  imageUrlHeader.innerHTML = 'Image URL:'
  addEditContainer.appendChild(imageUrlHeader);
  imageUrlHeader.classList.add('label-book-prop');
  let imageUrlInput = document.createElement('input');
  imageUrlInput.type = 'text';
  imageUrlInput.required = true;
  imageUrlInput.value = bookToEdit ? bookToEdit.imageUrl : '';
  addEditContainer.appendChild(imageUrlInput);
  imageUrlInput.classList.add('input-book-prop');

  let plotHeader = document.createElement('div');
  plotHeader.innerHTML = 'Plot:'
  addEditContainer.appendChild(plotHeader);
  plotHeader.classList.add('label-book-prop');
  let plotInput = document.createElement('input');
  plotInput.type = 'text';
  plotInput.required = true;
  plotInput.value = bookToEdit ? bookToEdit.plot : '';
  addEditContainer.appendChild(plotInput);
  plotInput.classList.add('input-book-prop');

  let buttonContainer = document.createElement('div');
  addEditContainer.appendChild(buttonContainer);
  buttonContainer.classList.add(addEditFormButtonContainer);

  let cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'Cancel'
  cancelButton.classList.add('edit-buttons-prop');
  cancelButton.addEventListener('click', function() {
    if (confirm('Discard changes?')) {
      window.history.back();
    } 
  });
  buttonContainer.appendChild(cancelButton);  

  let editButton = document.createElement('button');
  editButton.innerHTML = bookToEdit ? 'Edit' : 'Add'
  editButton.classList.add('edit-buttons-prop');
  editButton.addEventListener('click', function() {
    if(!nameInput.value || !authorInput.value || !imageUrlInput.value || ! plotInput.value) {
      alert('All fields are required!')
    } else {
      if(bookToEdit) {
        editBook(nameInput.value, authorInput.value, imageUrlInput.value, plotInput.value);
      } else {
        addBook(nameInput.value, authorInput.value, imageUrlInput.value, plotInput.value);
      }
    }    
  });
  buttonContainer.appendChild(editButton);

  return addEditContainer;
}

function parseQueryString() {

  let str = window.location.search;
  let objURL = {};

  str.replace(
      new RegExp( '([^?=&]+)(=([^&]*))?', 'g' ),
      function( $0, $1, $2, $3 ){
          objURL[ $1 ] = $3;
      }
  );
  return objURL;
}

function addBook(name, author, url, plot) {
  const books = getBooksFromStorage();
  const newBookId = books[books.length-1].id + 1;
  const newBook = {id: newBookId, name:name, author:author, imageUrl:url, plot:plot};
  books.push(newBook);
  localStorage.setItem(bookStorageKey, JSON.stringify(books));
  window.setTimeout(() => {
    window.alert('Book successfully added!');
    window.location.assign(window.location.href.split('/index.html')[0] 
    + `/index.html?id=${newBookId}#preview`);
  }, 1000);
}

function editBook(name, author, url, plot) {
  const bookToEditId = parseQueryString()['id'];
  const books = getBooksFromStorage();
  let bookToEdit;
  for(let i =0; i< books.length; i++){
    if(books[i].id === bookToEditId) {      
      bookToEdit = books[i];
      continue;
    }
  }
  bookToEdit.name = name;
  bookToEdit.author = author;
  bookToEdit.imageUrl = url;
  bookToEdit.plot = plot;
  localStorage.setItem(bookStorageKey, JSON.stringify(books));  
  window.setTimeout(() => {
    window.alert('Book successfully updated!');
    window.location.assign(window.location.href.split('/index.html')[0] 
        + `/index.html?id=${bookToEditId}#preview`);  
  }, 1000);
}

window.onload = function() {
  loadDataIntoStorage();
  createAppContainer();
  loadBooksInfoOnUI();
}

window.onhashchange = function() {
  window.location.reload();
}