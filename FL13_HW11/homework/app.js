const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');


let rightClickMenu = document.createElement('div')
let changeItem = document.createElement('p')
let deleteItem = document.createElement('p')
rightClickMenu.classList.add('right-click-menu');
changeItem.textContent = 'Rename';
deleteItem.textContent = 'Delete item';
rightClickMenu.append(changeItem, deleteItem);
rootNode.append(rightClickMenu);

function showFiles(data, rootNode) {
  for(let element of data) {
    let container = document.createElement('div');
    let icon = document.createElement('i');
    let name = document.createElement('p');
    container.classList.add('hideChildren', 'node')
    icon.classList.add('material-icons');
    name.classList.add('highlight');
    name.textContent = element.title;
    icon.textContent = element.folder ? 'folder' : 'insert_drive_file';
    icon.textContent === 'insert_drive_file' ? icon.classList.add('grey') : null;
    container.append(icon, name);
    rootNode.append(container);
    container.addEventListener('click', showHidden);
    name.addEventListener('contextmenu', contextMenu);
    name.addEventListener('click', hideContextMenu);
    document.addEventListener('click', hideContextMenu);


    if(element.folder) {
      if(element.children) {
        showFiles(element.children, container);
      } else {
        let container2 = document.createElement('div');
        let name = document.createElement('p');
        name.textContent = 'Folder is empty';
        name.classList.add('highlight2');
        container2.append(name);
        container2.classList.add('node');
        container.append(container2);
      }
    }
  }
}

function showHidden(el) {
  el.stopPropagation();
  el.currentTarget.classList.toggle('hideChildren');
  const icon = el.currentTarget.firstChild;

  if (icon.textContent === 'folder') {
    icon.textContent = 'folder_open';
  } else if (icon.textContent === 'folder_open') {
    icon.textContent = 'folder';
  }
}

function contextMenu(event) {
  event.preventDefault();
  rightClickMenu.classList.add('active');
  rightClickMenu.style.top = `${event.clientY}px`;
  rightClickMenu.style.left = `${event.clientX}px`;
  event.target.classList.add('active-element');

  deleteItem.addEventListener('click', () => {
    event.target.parentElement.remove();    
  })

  changeItem.addEventListener('click', () => {
    let input = document.createElement('input');
    input.type = 'text';
    input.value = event.target.innerText;
    input.addEventListener('click', (inputEvent) => {
      inputEvent.stopPropagation();		
      let name = document.createElement('p');
      name.classList.add('highlight');
      name.textContent = inputEvent.target.value;
      name.addEventListener('contextmenu', contextMenu);
      name.addEventListener('click', hideContextMenu);
      inputEvent.target.parentElement.replaceChild(name, inputEvent.target);
    });
    event.target.parentElement.replaceChild(input, event.target);
    input.focus();
  const commaIndex = input.value.lastIndexOf('.');
  const index = -1;
	if(commaIndex > index) {
		input.setSelectionRange(0, commaIndex);
	} else {
		input.select();
	}
	
    });
  }
  
  const CLICK_VALUE = 2;
  
  function hideContextMenu(event) {
    if(event.butto2 !== CLICK_VALUE) {
      rightClickMenu.classList.remove('active')
      document.querySelector('.active-element').classList.remove('active-element');
    }
  }

showFiles(data, rootNode);

document.addEventListener('contextmenu', contextMenu);