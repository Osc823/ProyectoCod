const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Registro exitoso
            window.location.replace('/home');
        } else {
            // Manejar el caso de fallo de registro
            const errorMessage = await response.text();
            console.error('Error en el registro:', errorMessage);
            // Puedes mostrar un mensaje de error en tu interfaz aquí
        }
    } catch (error) {
        console.error('Error en el registro:', error.message);
        // Puedes mostrar un mensaje de error en tu interfaz aquí
    }
});
