document.addEventListener('DOMContentLoaded', async () => {
    // Define la URL de la API donde se gestionan las tareas
    const apiUrl = '/api/blog';

    // Intenta cargar datos de la tarea si se está editando
    const blogId = localStorage.getItem('blogId'); // Obtiene el ID de la tarea del localStorage
    if (blogId) {
        // Realiza una solicitud a la API para obtener la tarea específica
        const response = await fetch(`${apiUrl}/${blogId}`);

        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            // Convierte la respuesta en formato JSON
            const blog = await response.json();

            // Rellena el formulario con los datos del blog
            document.getElementById('blog-id').value = blog.id;
            document.getElementById('titulo').value = blog.titulo;
            document.getElementById('contenido').value = blog.contenido;
            document.getElementById('autor').value = blog.autor;
            document.getElementById('fecha').value = blog.fecha;
            document.getElementById('estado').value = blog.estado;
            document.getElementById('form-title').innerText = 'Editar blog'; // Cambia el título del formulario
        } else {
            // Si hay un error al cargar el blog, lo registra en la consola
            console.error('Error al cargar el blog:', response.statusText);
        }
    }

    // Manejo del formulario
    const formElement = document.getElementById('blog-form'); // Obtiene el elemento del formulario
    if (formElement) {
        // Agrega un evento de escucha para el envío del formulario
        formElement.addEventListener('submit', async (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto del formulario

            // Obtiene el ID del blog y los datos del formulario
            const id = document.getElementById('blog-id').value;
            const blog = {
                titulo: document.getElementById('titulo').value,
                contenido: document.getElementById('contenido').value,
                autor: document.getElementById('autor').value,
                fecha: document.getElementById('fecha').value,
                estado: document.getElementById('estado').value
            };

            // Verifica si se está editando un blog existente o creando uno nuevo
            if (id) {
                // Si hay un ID, realiza una solicitud PUT para actualizar la tarea
                await fetch(`${apiUrl}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json' // Indica que se está enviando JSON
                    },
                    body: JSON.stringify(blog) // Convierte el objeto blog a JSON
                });
            } else {
                // Si no hay ID, realiza una solicitud POST para crear una nueva tarea
                await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Indica que se está enviando JSON
                    },
                    body: JSON.stringify(blog) // Convierte el objeto tarea a JSON
                });
            }

            // Limpia el localStorage después de guardar la tarea
            localStorage.removeItem('blogId');

            // Redirige al usuario a la página de listado de tareas
            window.location.href = 'listado.html';
        });
    } else {
        // Si no se encuentra el formulario, registra un error en la consola
        console.error('El formulario no se encontró');
    }
});