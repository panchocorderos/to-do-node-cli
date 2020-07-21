const fs = require('fs');
const { rejects } = require('assert');
const { resolve } = require('path');

let listadoToDo = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoToDo);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

const cargarDB = () => {
    try {
        listadoToDo = require('../db/data.json');
        return listadoToDo;
    } catch (error) {
        listadoToDo = []
    }

}

const crear = (descripcion) => {
    cargarDB();
    let toDo = {
        descripcion,
        completado: false
    };

    listadoToDo.push(toDo);
    guardarDB();
    return toDo;
}

const getListado = () => {
    return cargarDB();
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);
    if (index != -1) {
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoToDo.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoToDo.length === nuevoListado.length) {
        return false;
    } else {
        listadoToDo = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}