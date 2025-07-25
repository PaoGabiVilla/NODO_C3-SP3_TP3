// controllers/superheroesController.mjs

import { 
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes,//sprint2TP3
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    obtenerSuperheroesMenoresDe30,
    crearNuevoSuperheroe, 
    actualizarSuperheroe, 
    eliminarSuperheroePorId, 
    eliminarSuperheroePorNombre
} from '../services/superheroesService.mjs';


import { 
    renderizarSuperheroe, 
    renderizarListaSuperheroes 
} from '../views/responseView.mjs';

//sprint1
export function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroe = obtenerSuperheroePorId(parseInt(id));
    
    if (superheroe) {
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}


/* Ya lo usamos mas abajo 
export function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    const superheroes = buscarSuperheroesPorAtributo(atributo, valor);
    
    if (superheroes.length > 0) {
        res.send(renderizarListaSuperheroes(superheroes));
    } else {
        res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }
}
*/

/*
export function obtenerSuperheroesMayoresDe30Controller(req, res) {
    const superheroes = obtenerSuperheroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes));
}
*/


//Sprint2TP3

export async function obtenerSuperHeroePorIdController(req, res) {
  try {
    console.log('Estoy en la capa controlador en la función obtenerSuperHeroePorIdController y me llegó req', req)
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).send(superheroeFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener al superhéroe',
      error: error.message });
  }
}
/*
export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener los superhéroes',
      error: error.message });
  }
}*/

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes con ese atributo'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
      error: error.message });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes mayores de 30 años'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30',
      error: error.message });
  }
}


export async function obtenerSuperheroesMenoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMenoresDe30();
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes menores de 30 años'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener superhéroes menores de 30',
      error: error.message });
  }
}

//Sprint 3 tp1
/*export async function crearNuevoSuperheroeController(req, res) {

    try {
        const datos = req.body;

        console.log("Datos recibidos:", datos); // agrego esta línea 
        
        const superheroeCreado = await crearNuevoSuperheroe(datos);
        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Superheroe nuevo no encontrado' })
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'error al crear nuevo superheroe', error: error.message })
    }
}*/

export async function crearNuevoSuperheroeController(req, res) {
    try {
        const datos = req.body; // Obtiene los datos del cuerpo de la solicitud
        const superheroeCreado = await crearNuevoSuperheroe(datos);

        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Error al crear superhéroe' });
        }

        const superheroesActualizados = await obtenerTodosLosSuperheroes();
        res.render('dashboard', { superheroes: superheroesActualizados, successMessage: '¡Superhéroe creado exitosamente!' });
    } catch (error) {
        res.render('dashboard', {
            errorMessage: 'Hubo un error al crear el superhéroe. Asegúrate de completar todos los campos correctamente.'
        });
    }
}

//modificar

/*export async function actualizarSuperheroeController(req, res) {

    try {
        const { id } = req.params;
        const datosActualizar = req.body;
        console.log(id);
        console.log(typeof (id));

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizar);
        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe a actualizar no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}*/

/**
 * Controlador para actualizar un superhéroe por su ID.
 */

export async function actualizarSuperheroeController(req, res) {
    try {
      console.log('🛠 Entró a actualizarSuperheroeController con id:', req.params.id);
        const { id } = req.params;
        const datosActualizar = req.body;

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizar);
        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe a actualizar no encontrado.' });
        }

        const superheroesActualizados = await obtenerTodosLosSuperheroes();
        res.render('dashboard', { superheroes: superheroesActualizados, successMessage: '¡Superhéroe editado exitosamente!' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}


/*
export async function eliminarSuperheroePorIdController(req, res) {
    try{
        console.log('Capa controller - función eliminar por Id');
        const{ id }= req.params;
        const superheroeEliminado = await eliminarSuperheroePorId(id);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminado no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}
*/

/**
 * Controlador para eliminar un superhéroe por su ID.
 */
export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorId(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminar no encontrado.' });
        }

        const superheroesActualizados = await obtenerTodosLosSuperheroes();
        res.render('dashboard', { superheroes: superheroesActualizados, successMessage: '¡Superhéroe eliminado exitosamente!' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

export async function eliminarSuperheroePorNombreController(req, res){

    try{
        console.log('Capa controller - función eliminar por Nombre');
        const { nombre } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminado no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    const heroes = await obtenerTodosLosSuperheroes(); // Llama al servicio que trae los héroes
    res.render('dashboard', { superheroes: heroes }); // Renderiza la vista con los datos
  } catch (error) {
    console.error('Error al obtener superhéroes:', error);
    res.status(500).send('Error interno del servidor');
  }
};
export async function renderizarFormularioEdicionController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id); // una función que devuelve el superhéroe por su ID

    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }

    res.render('editSuperhero', { superheroe }); // Esto es lo que carga el archivo EJS
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al cargar el formulario de edición',
      error: error.message,
    });
  }
}


export async function agregarNuevoSuperheroeController(req, res) {
    try {
        const datos = req.body; // Obtiene los datos del cuerpo de la solicitud
        const superheroeCreado = await crearNuevoSuperheroe(datos);

        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Error al crear superhéroe' });
        }

        const superheroesActualizados = await obtenerTodosLosSuperheroes();
        res.render('dashboard', { superheroes: superheroesActualizados, successMessage: '¡Superhéroe creado exitosamente!' });
    } catch (error) {
        res.render('addSuperhero', {
            errorMessage: 'Hubo un error al crear el superhéroe. Asegúrate de completar todos los campos correctamente.'
        });
    }
}