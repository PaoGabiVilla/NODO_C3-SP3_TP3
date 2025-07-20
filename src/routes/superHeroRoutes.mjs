import express from 'express';
import {
    obtenerSuperHeroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    obtenerSuperheroesMenoresDe30Controller,
    crearNuevoSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';

import { registerValidationRules } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';

//superHeroRoutes.mjs

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/menores-30', obtenerSuperheroesMenoresDe30Controller);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController)

//Sprint3TP1
router.post('/heroes/crear', registerValidationRules(),handleValidationErrors, crearNuevoSuperheroeController);
router.put('/heroes/actualizar/:id', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController);
router.delete('/heroes/eliminar/id/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;