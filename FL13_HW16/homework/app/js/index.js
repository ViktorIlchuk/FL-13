const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const minSuccessCode = 200;
const maxSuccessCode = 300;

let request = obj => {
  return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method || 'GET', obj.url);
      if (obj.headers) {
          Object.keys(obj.headers).forEach(key => {
              xhr.setRequestHeader(key, obj.headers[key]);
          });
      }
      xhr.onload = () => {
          if (xhr.status >= minSuccessCode && xhr.status < maxSuccessCode) {
              resolve(xhr.response);
          } else {
              reject(xhr.statusText);
          }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(obj.body);
  });
};

function updateUser(event) {
  const name = event.target.previousSibling
  const fullName = name.previousSibling
  const parentNode = event.target.parentNode
  const nameInput = document.createElement('input')
  const fullNameInput = document.createElement('input')
  parentNode.append(nameInput)
  parentNode.append(fullNameInput)
  name.classList.add('disapear')
  fullName.classList.add('disapear')
}

const deleteUser = (userId, userElement) => {
  request({
    method: 'DELETE',
    url: `${baseUrl}/users/${userId}`,
    headers: {
      'Authorization': 'admin'
    }
  })
  userElement.remove();
}

request({
  url: `${baseUrl}/users`
})
  .then(data => {
    const users = JSON.parse(data)
    renderUsers(users)
  })
  .catch(error => {
    console.log(error);
});

const createBtn = document.querySelector('#create-user')
createBtn.addEventListener('click', () => {
  createUser();
})

const createUser = () => {
  const name = document.querySelector('#name').value
  const username = document.querySelector('#full-name').value
  let lastAdded;

  if(name !== '' && username !== '') {
    request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({name, username})
    })
    request({
      url: `${baseUrl}/users`
    })
      .then(data => {
        const users = JSON.parse(data)
        lastAdded = users[users.length - 1]
        renderUsers([lastAdded]);
      })
      .catch(error => {
        console.log(error);
    });
  } else {
    alert('Invalid value')
  }
}

function renderUsers(users) {
  users.forEach(element => {
    const user = document.createElement('div')
    const id = document.createElement('div')
    const userName = document.createElement('div')
    const fullName = document.createElement('div')
    const updateBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    user.classList.add('user')
    id.innerHTML = element.id;
    userName.innerHTML = element.username
    fullName.innerHTML = element.name
    updateBtn.innerHTML = 'Update'
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.addEventListener('click', () => {
      deleteUser(element.id, user);
    })
    updateBtn.addEventListener('click', () => {
      updateUser(event);
    })
    user.append(id)
    user.append(userName)
    user.append(fullName)
    user.append(updateBtn)
    user.append(deleteBtn)
    appContainer.append(user)
  });
}