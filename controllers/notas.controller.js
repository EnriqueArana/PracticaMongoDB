const {response} = require('express');
const Nota = require("../models/nota.model");

const getNotas = async(req, res)=>{
    const notas = await Nota.find({}, 'nota1 nota2 nota3 promedio');
    res.json({
        ok:true,
        notas
    });
}

const crearNota = async(req, res=response)=>{
    //console.log(req.body);
    const {nota1,nota2,nota3,promedio} = req.body;
    try {

        //creamos un objeto de la clase model Nota
        const notas = new Nota(req.body);

        //indicamos a mongoose que registre las notas en la BD
        await notas.save();
        res.json({
            ok:true,
            notas
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }   
}

const actualizarNota = async (req, res= response)=>{ 
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const nota = await Nota.findById( id );

        if ( !nota) {
            return res.status(404).json({
                ok: true,
                msg: 'Nota no encontrada por id',
            });
        }

        const cambiosNota = {
            ...req.body,
            nota: uid
        }

        const notaActualizada = await Nota.findByIdAndUpdate( id, cambiosNota, { new: true } );


        res.json({
            ok: true,
            nota: notaActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se pueden actualizar las notas, consulte con el administrador'
        })
    }
}

const eliminarNota = async(req, res=response)=>{
    const uid = req.params.id;
    try{
        const notaDB = await Nota.findById(uid);
        if (!notaDB) {
            return res.status(404).json({
                ok: false,
                msg:'No existen notas con ese id'
            });
        }
        await Nota.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Notas eliminadas de la BD'
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible eliminar estas notas'
        })
    }
}

module.exports = {
    getNotas,
    crearNota,
    actualizarNota,
    eliminarNota
}