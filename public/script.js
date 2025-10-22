document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const FirstName = document.getElementById('firstName').value;
  const LastName = document.getElementById('lastName').value;
  const Email = document.getElementById('email').value;

  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ FirstName, LastName, Email })
  });

  document.getElementById('userForm').reset();
  loadUsers();
});

async function loadUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.Id}</td>
      <td>${user.FirstName}</td>
      <td>${user.LastName}</td>
      <td>${user.Email}</td>
      <td><button class="delete-btn" onclick="deleteUser(${user.Id})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

async function deleteUser(id) {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
  loadUsers();
}

loadUsers();
