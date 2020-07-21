const colors = require('colors');
const argv = require('./config/yargs').argv;
const toDo = require('./to-do/to-do');

let comando = argv._[0];
switch (comando) {
    case 'crear':
        let tarea = toDo.crear(argv.descripcion);
        break;
    case 'listar':
        let listado = toDo.getListado();
        for (let tarea of listado) {
            console.log('=====Por Hacer====='.green);
            console.log(tarea.descripcion);
            console.log(`Estado: ${tarea.completado}`);
            console.log('===================\n'.green);
        }
        break;
    case 'actualizar':
        let actualizado = toDo.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = toDo.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no reconocido');

}