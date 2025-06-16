// Stores guests as arrays
let guests = [];
const maxGuests = 10;

const form = document.getElementById('guestForm');
const tbody = document.querySelector('#guestTable tbody');
const nameInput = document.getElementById('guestName');
const categorySelect = document.getElementById('category');
const submitBtn = form.querySelector('button');

// Prevent page reloading
form.onsubmit = (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const category = categorySelect.value;

//Alert msg when guests exceed 10
  if (!name) return alert('Please enter a guest name');
  if (guests.length >= maxGuests) return alert('Guest list is full!');

// Add new guests to array
  guests.push({ name, category, attending: true });
  nameInput.value = '';
  displayGuests();
};
// Creates new rows for each added guest
function displayGuests() {
  tbody.innerHTML = '';
  guests.forEach((g, i) => {
    const row = tbody.insertRow();
    row.className = `row-${g.category}`;
    row.innerHTML = `
      <td>${g.name}</td>
      <td class="${g.attending ? 'status-attending' : 'status-not-attending'}">
        ${g.attending ? 'Attending' : 'Not Attending'}
      </td>
      <td><span class="category-${g.category}">${g.category}</span></td>
      <td>
        <button onclick="toggle(${i})">${g.attending ? 'Mark Not Attending' : 'Mark Attending'}</button>
        <button onclick="remove(${i})">Remove</button>
      </td>
    `;
  });
  submitBtn.disabled = guests.length >= maxGuests;// Submit is disabled after 10 guests

  submitBtn.textContent = guests.length >= maxGuests ? 'Guest List Full' : 'Add Guest';
}
// Changes RSVP status
function toggle(i) {
  guests[i].attending = !guests[i].attending;
  displayGuests();
}
// Removes added guests
function remove(i) {
  guests.splice(i, 1);
  displayGuests();
}


