/*
    Docentes
    ruta: '/api/docentes'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDocente, 
    crearDocente,
    actualizarDocente,
    eliminarDocente
} = require('../controllers/docentes.controller')


const router = Router();

router.get( '/', getDocente );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del docente es necesario').not().isEmpty(),
        check('apellido','El apellido del docente es necesario').not().isEmpty(),
        check('usuario','El id del usuario debe de ser válido').isMongoId(),
        check('matricula','El código de la matrícula debe de ser válido').isMongoId(),
        check('curso','El nombre del curso debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearDocente 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del docente es necesario').not().isEmpty(),
        check('curso','El nombre del curso debe de ser válido').not().isEmpty(),
        validarCampos
    ],
    actualizarDocente
);

router.delete( '/:id',validarJWT, eliminarDocente);



module.exports = router;