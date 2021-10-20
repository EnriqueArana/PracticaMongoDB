const { response } = require('express');

const Matricula = require('../models/matricula.model');

const getMatricula = async(req, res = response) => {
    const matriculas = await Matricula.find()
                                .populate('usuario','correo')
                                .populate('estudiante','codigo nombre apellido')
                                .populate('docente','nombre apellido')
                                .populate('curso','nombre creditos')


    res.json({
        ok: true,
        matriculas: matriculas
    })
}

const crearMatricula = async (req, res = response) => {

    const uid = req.uid;
    const matricula = new Matricula({
        matricula: uid,
        ...req.body
    });


    try {

        const matriculaDB = await matricula.save();
        
        res.json({
            ok: true,
            matricula: matriculaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear la matrícula, consulte con el administrador'
        })
    }


}

const actualizarMatricula = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const matricula = await Matricula.findById( id );

        if ( !matricula ) {
            return res.status(404).json({
                ok: true,
                msg: 'Matricula no encontrada por id',
            });
        }

        const cambiosMatricula = {
            ...req.body,
            matricula: uid
        }

        const matriculaActualizada = await Matricula.findByIdAndUpdate( id, cambiosMatricula, { new: true } );


        res.json({
            ok: true,
            matricula: matriculaActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la matrícula, consulte con el administrador'
        })
    }

}

const eliminarMatricula = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const matricula = await Matricula.findById( id );

        if ( !matricula ) {
            return res.status(404).json({
                ok: true,
                msg: 'Matricula no encontrado por id',
            });
        }

        await Matricula.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Matricula eliminada'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'La matrícula no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getMatricula, 
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
}