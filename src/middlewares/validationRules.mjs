import { body } from 'express-validator';

export const registerValidationRules = () => [
  
//Validaciones sprint3 tp2

/*nombreSuperheroe debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud minima de 
3 caracteres y una longitud maxima de 60*/
    body('nombreSuperHeroe').trim().notEmpty().withMessage('El nombre del superheroe es necesario')
    .isLength({ min: 3, max: 60 }).withMessage('Debe tener entre 3 y 60 caracteres'),

/*nombreReal debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud 
minima de 3 caracteres y una longitud maxima de 60*/
    body('nombreReal').notEmpty().withMessage('El nombre Real es requerido')
    .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres').trim(),

/*edad debe validarse que sea requerido, que sea un número, no tenga espacios en blanco(trim), 
valor minimo 0 (no admite edad negativa)*/
    body('edad').notEmpty().withMessage('Edad es requerida')
    .isInt({ min: 0 }).withMessage('Edad incorrecta')
    .trim(),

/*poderes debe validarse que sea requerido, que sea un array de string cuyo tamaño no sea 0, 
cada elemento no tenga espacios en blanco, cada elemento una longitud minima de 3 caracteres 
y una longitud maxima de 60*/

    body('poderes').notEmpty().withMessage('Lista de poderes requerida')
    .isArray({ min: 1 }).withMessage('Poderes no es un array o está vacío'),
    body('poderes.*')
    .isString().withMessage('Cada poder debe ser una cadena de texto')
    .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres')
    .trim()
]
