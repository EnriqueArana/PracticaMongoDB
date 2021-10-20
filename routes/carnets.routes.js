/*
    Ruta: /api/carnets
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {getCarnet,
    crearCarnet,
    actualizarCarnet,
    eliminarCarnet} = require('../controllers/carnets.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getCarnet);
router.post('/',
    [
        check('id_carnet','El id del carnet es obligatoria').not().isEmpty(),
        check('fecha_emision','La fecha de emisión es obligatoria').not().isEmpty(),
        check('fecha_caducidad','La fecha de caducidad es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearCarnet);
router.put('/:id', 
    [
    validarJWT,
    check('id_carnet','El id del carnet es obligatoria').not().isEmpty(),
    check('fecha_emision','La fecha de emisión es obligatoria').not().isEmpty(),
    check('fecha_caducidad','La fecha de caducidad es obligatoria').not().isEmpty(),
    validarCampos, 
    ],
    actualizarCarnet);
router.delete('/:id',validarJWT,eliminarCarnet);


module.exports = router;

