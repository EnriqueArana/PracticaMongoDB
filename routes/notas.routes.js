/*
    Ruta: /api/notas
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {getNotas,
    crearNota,
    actualizarNota,
    eliminarNota} = require('../controllers/notas.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getNotas);
router.post('/',
    [
        check('nota1','La nota1 es obligatoria').not().isEmpty(),
        check('nota2','La nota2 es obligatoria').not().isEmpty(),
        check('nota3','La nota3 es obligatoria').not().isEmpty(),
        check('promedio','El promedio es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearNota);
router.put('/:id', 
    [
    validarJWT,
    check('nota1','La nota1 es obligatoria').not().isEmpty(),
    check('nota2','La nota2 es obligatoria').not().isEmpty(),
    check('nota3','La nota3 es obligatoria').not().isEmpty(),
    check('promedio','El promedio es obligatorio').not().isEmpty(),
    validarCampos, 
    ],
    actualizarNota);
router.delete('/:id',validarJWT,eliminarNota);


module.exports = router;

