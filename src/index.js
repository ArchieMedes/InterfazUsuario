const express = require('express');
const app = express(); // ejecutamos el framework de express
const morgan = require('morgan'); // MIDDLEWARE: permite ver POR CONSOLA lo que llega al SERVIDOR

// SETTINGS
// en lugar de declararlo como una variable lo hago así porque "app." la puedo llamar desde cualquier parte de mi aplicación
app.set('port', process.env.PORT || 3000); // esto es como crear una variable llamada PORT con un valor numérico de 3000 o UN PUERTO YA DEFINIDO POR EL SERVICIO DE LA NUBE DONDE MONTARÉ MI APP

// MIDDLEWARES
app.use( morgan('dev') );
app.use( express.json() ); // permite que nuestro servidor levantado con NodeJS reciba y entienda archivos JSON
app.use( express.urlencoded({ // para recibir datos de FORMULARIOS y ENTENDERLOS
    extended: false
    })
);

// ROUTES
app.use('/api/users', require('./routes/users'));

// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});