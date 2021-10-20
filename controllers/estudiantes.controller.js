const { response } = require('express');

const Estudiante = require('../models/estudiante.model');

const getEstudiante = async(req, res = response) => {
    const estudiantes = await Estudiante.find()
                                .populate('usuario','nombre correo')
                                .populate('nota','promedio')


    res.json({
        ok: true,
        estudiantes: estudiantes
    })
}

const crearEstudiante = async (req, res = response) => {

    const uid = req.uid;
    const estudiante = new Estudiante({
        usuario: uid,
        ...req.body
    });


    try {

        const estudianteDB = await estudiante.save();
        
        res.json({
            ok: true,
            estudiante: estudianteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear estudiante, consulte con el administrador'
        })
    }


}

const actualizarEstudiante = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const estudiante = await Estudiante.findById( id );

        if ( !estudiante ) {
            return res.status(404).json({
                ok: true,
                msg: 'Estudiante no encontrado por id',
            });
        }

        const cambiosEstudiante = {
            ...req.body,
            usuario: uid
        }

        const estudianteActualizado = await Estudiante.findByIdAndUpdate( id, cambiosEstudiante, { new: true } );


        res.json({
            ok: true,
            estudiante: estudianteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar estudiante, consulte con el administrador'
        })
    }

}

const eliminarEstudiante = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const estudiante = await Estudiante.findById( id );

        if ( !estudiante ) {
            return res.status(404).json({
                ok: true,
                msg: 'Estudiante no encontrado por id',
            });
        }

        await Estudiante.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Estudiante borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Estudiante no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getEstudiante, 
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}