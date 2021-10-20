const {response} = require('express');
const Carnet = require("../models/carnet.model");

const getCarnet = async(req, res)=>{
    const carnets = await Carnet.find({}, 'id_carnet fecha_emision fecha_caducidad');
    res.json({
        ok:true,
        carnets
    });
}

const crearCarnet = async(req, res=response)=>{
    //console.log(req.body);
    const {id_carnet,fecha_emision,fecha_caducidad} = req.body;
    try {

        //creamos un objeto de la clase model Carnet
        const carnets = new Carnet(req.body);

        //indicamos a mongoose que registre el carnet en la BD
        await carnets.save();
        res.json({
            ok:true,
            carnets
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }   
}

const actualizarCarnet = async (req, res= response)=>{ 
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const carnet = await Carnet.findById( id );

        if ( !carnet) {
            return res.status(404).json({
                ok: true,
                msg: 'Carnet no encontrado por id',
            });
        }

        const cambiosCarnet = {
            ...req.body,
            carnet: uid
        }

        const carnetActualizado = await Carnet.findByIdAndUpdate( id, cambiosCarnet, { new: true } );


        res.json({
            ok: true,
            carnet: carnetActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el carnet, consulte con el administrador'
        })
    }
}

const eliminarCarnet = async(req, res=response)=>{
    const uid = req.params.id;
    try{
        const carnetDB = await Carnet.findById(uid);
        if (!carnetDB) {
            return res.status(404).json({
                ok: false,
                msg:'No existe carnet con ese id'
            });
        }
        await Carnet.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Carnet eliminado de la BD'
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible eliminar este carnet'
        })
    }
}

module.exports = {
    getCarnet,
    crearCarnet,
    actualizarCarnet,
    eliminarCarnet
}