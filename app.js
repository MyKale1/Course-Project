function openTab(evt, tab) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}

var inputName = document.getElementById('name');
var inputEmail = document.getElementById('email');
var inputPhone = document.getElementById('phone');
var button = document.querySelector('.submit');
var regEx = /\S+@\S+\.\S+/;
var form = document.querySelector('.form');

function checkInput() {
    if (inputName.value.trim() !== "" && regEx.test(inputEmail.value) && inputPhone.value.trim() !== "") {
        button.style.borderColor = 'black';
        button.style = 'color: white;';
        button.style = "background-color: rgb(110, 173, 175);";
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Contact Added")
    console.log('Submitted');
})

class Contact {
    constructor(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

// UI
class UI {
    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach((contact) => UI.addContactToList(contact));
    }

    static addContactToList(contact) {
        const list = document.querySelector('#contact-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>

            <td><button type="button" class="btn btn-danger btn-sm delete">Delete</button></td>
        `;
        list.appendChild(row)
    }
//           <td><button type="button" class="btn btn-info">Details</button></td>
//           <td><button type="button" class="btn btn-warning">Edit</button></td>

    static deleteContact(e) {
        if(e.classList.contains('delete')) {
          e.parentElement.parentElement.remove();
        }
      }


    static clearFields(){
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('.submit').disabled = true;
        document.querySelector('.submit').style = "border-color: null; background-color: #c9c9c9; color: black;"
    }
}

class Store {
    static getContacts() {
        let contacts;
        if(localStorage.getItem('contacts')=== null) {
            contacts = [];
        } else {
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    }
    static addContact(contact) {
        const contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    static removeContact(phone){
        const contacts = Store.getContacts();
        contacts.forEach((contact, index) => {
            if(contact.phone === phone) {
                contacts.splice(index, 1);
            }
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayContacts);

document.querySelector('#form').addEventListener('submit', (e)=> {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    const contact = new Contact(name, email, phone);

    UI.addContactToList(contact);

    Store.addContact(contact);

    UI.clearFields();

});

document.querySelector('#contact-list').addEventListener('click', (e) => {
    UI.deleteContact(e.target);
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
})
