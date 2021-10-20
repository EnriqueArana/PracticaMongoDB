/*
    Estudiantes
    ruta: '/api/estudiantes'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getEstudiante, 
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} = require('../controllers/estudiantes.controller.js')


const router = Router();

router.get( '/', getEstudiante );

router.post( '/',
    [
        validarJWT,
        check('codigo','El código del estudiante es necesario').not().isEmpty(),
        check('nombre','El nombre del estudiante es necesario').not().isEmpty(),
        check('apellido','El apellido del estudiante es necesario').not().isEmpty(),
        check('usuario','El id del usuario debe ser válido').isMongoId(),
        check('matricula','El id de matrícula debe ser válido').isMongoId(),
        check('nota','El id de las notas debe ser válido').isMongoId(),
        validarCampos
    ], 
    crearEstudiante 
);

router.put( '/:id',
    [
        validarJWT,
        check('codigo','El código del estudiante es necesario').not().isEmpty(),
        check('nombre','El nombre del estudiante es necesario').not().isEmpty(),
        check('apellido','El apellido del estudiante es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarEstudiante
);

router.delete( '/:id',validarJWT, eliminarEstudiante);



module.exports = router;