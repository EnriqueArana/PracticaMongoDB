/*
    Matrículas
    ruta: '/api/matriculas'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMatricula, 
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
} = require('../controllers/matriculas.controller')


const router = Router();

router.get( '/', getMatricula );

router.post( '/',
    [
        validarJWT,
        check('id_matricula','El id de matrícula es necesario').not().isEmpty(),
        check('usuario','El id del usuario debe ser válido').isMongoId(),
        check('estudiante','El id del estudiante debe ser válido').isMongoId(),
        //check('docente','El nombre del docento debe ser válido').isMongoId(),
        check('curso','El id del curso debe ser válido').isMongoId(),
        validarCampos
    ], 
    crearMatricula 
);

router.put( '/:id',
    [
        validarJWT,
        check('id_matricula','El id de matrícula es necesario').not().isEmpty(),
        check('usuario','El nombre del usuario debe ser válido').isMongoId(),
        check('estudiante','El nombre del estudiante debe ser válido').isMongoId(),
        check('docente','El nombre del docento debe ser válido').isMongoId(),
        check('curso','El nombre del curso debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMatricula
);

router.delete( '/:id',validarJWT, eliminarMatricula);



module.exports = router;