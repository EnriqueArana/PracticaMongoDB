/*
    Cursos
    ruta: '/api/cursos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCurso, 
    crearCurso,
    actualizarCurso,
    eliminarCurso
} = require('../controllers/cursos.controller')


const router = Router();

router.get( '/', getCurso );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del curso es necesario').not().isEmpty(),
        check('creditos','EL número de créditos es necesario').not().isEmpty(),
        //check('docente','El id del docente debe ser válido').isMongoId(),
        validarCampos
    ], 
    crearCurso 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del curso es necesario').not().isEmpty(),
        check('creditos','EL número de créditos es necesario').not().isEmpty(),
        check('docente','El id del docente debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarCurso
);

router.delete( '/:id',validarJWT, eliminarCurso);



module.exports = router;