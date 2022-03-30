const heroes = {
    capi: {
        nombre: 'Capitán América',
        poder: 'Aguantar inyecciones sin morir'
    },
    iron: {
        nombre: 'Ironman',
        poder: 'Absurda cantidad de dinero'
    },
    spider: {
        nombre: 'Spiderman',
        poder: 'La mejor reaccion alergica a las picaduras de araña'
    },
}



export const buscarHeroe = ( id, callback) => {

    const heroe = heroes[id];

    if ( heroe ) {
        callback( null , heroe)
    } else {
        callback(`No existe un héroe con el id ${ id } `)
    }

} 