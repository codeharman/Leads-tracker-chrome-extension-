// elements referencing
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('saveinput-btn');
const saveBtn = document.getElementById('savetab-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');

// leads array to store the leads
let myLeads = [];

// getting the leads from local storage if any
const leadsStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsStorage) {
  myLeads = leadsStorage; // fixed typo
  render(myLeads);
}

// function to render the leads
function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target="_blank" href="${leads[i]}">${leads[i]}</a>
      </li>`;
  }
  ulEl.innerHTML = listItems; // moved inside render()
}

// adding event listener to save input button
inputBtn.addEventListener('click', function() {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

// adding event listener to save tab button
saveBtn.addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

// adding event listener to delete button
deleteBtn.addEventListener('dblclick', function() {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
