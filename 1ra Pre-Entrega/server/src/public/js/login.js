const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            window.location.replace('/home');
        } else {
            // Manejar el caso de fallo de login
            console.error('Error en el login:', response.statusText);
            // Puedes mostrar un mensaje de error en tu interfaz aquí
        }
    } catch (error) {
        console.error('Error en el login:', error.message);
        // Puedes mostrar un mensaje de error en tu interfaz aquí
    }
});
