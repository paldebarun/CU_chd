document.getElementById('facultylogin').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username + password);

    const response = await fetch('http://localhost:8000/api/facultyadvisorRoutes/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      window.location.href = '/facultyDashboard';
    } else {
      document.getElementById('error').textContent = result.message;
    }
  });