// elements referencing
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('saveinput-btn');
const saveBtn = document.getElementById('savetab-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');

// leads array to store the leads
let myLeads = [];

// Need to work on the LocalStorage part
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render();
}

// Need to work on the rendering part
function render() {
  let listItems = '';
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `<li><a href='${myLeads[i]}' target='_blank'>${myLeads[i]}</a></li>`
  }
  ulEl.innerHTML = listItems;
}

// Need to work on the input button part
inputBtn.addEventListener('click', function() {
  myLeads.push(inputEl.value)
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render();
})

// Need to work on the delete button part
deleteBtn.addEventListener('click', function() {
  localStorage.clear();
  myLeads = [];
  render();
})
// Need to work on the save tab part
saveBtn.addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    myLeads.push(tabs[0].url); // grab the current tab's URL
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render();
  });
});