var Userdb = require('../model/model');


//CREATE
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Data Tidak Boleh Kosong"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Server Mungkin Lelah, Coba Lagi"
            });
        });

}

//GET
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Tidak Bisa Menemukan Data Dengan Id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error Mengambil data dengan Id" + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Sabar, Coba Lagi Aja" })
            })
    }

    
}

// UPDATE
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data Gak Boleh Kosong"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Gabisa Update ${id}. Mungkin user Tidak Ada`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Mengambil Data"})
        })
}

//DELETE
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Gabisa Hapus Data Dengan id ${id}. Cek Lagi Id nya`})
            }else{
                res.send({
                    message : "Berhasil Menghapus Data"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Server Lelah, Gabisa Hapus Data Dengan Id=" + id
            });
        });
}