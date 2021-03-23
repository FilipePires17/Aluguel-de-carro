import sql from '../mysql.js';

export const getCars = (req, res) => {
    sql.query('select * from carro', (err, results) => {
        if(err) return res.status(500).send({error: err});
        res.status(200).send({
            result: results
        });
    });
}

export const postCar = (req, res) => {
    const { 
        codcar,
        modelo,
        diaria,
        ano,
        cor,
        placa,
        passageiros,
        velocidade,
        esportivo,
        seda
    } = req.body;
    sql.query(
        'insert into carro values(?,?,?,?,?,?,?,?,?,?)',
        [codcar,modelo,diaria,ano,cor,placa,passageiros,velocidade,esportivo,seda],
        (err) => {
            if(err) return res.status(500).send({error: err});
            res.status(201).send({message: 'Criado'});
        });
}

export const deleteCar = (req, res) => {
    const id = req.params.id;
    sql.query('delete from carro where CodCar = ?', [id], (err) => {
        if(err) return res.status(500).send({error: err});
        res.status(202).send({message: 'Deletado'});
    });
}

export const patchCar = (req, res) => {
    const id = req.params.id;
    const { 
        codcar,
        modelo,
        diaria,
        ano,
        cor,
        placa,
        passageiros,
        velocidade,
        esportivo,
        seda
    } = req.body;
    sql.query(
        'update carro set ' +
        'CodCar = ? ' +
        'modelo = ? ' +
        'diaria = ? ' +
        'ano = ? ' +
        'Cor = ? ' +
        'Placa = ? ' +
        'passageiros = ? ' +
        'velocidade = ?' +
        'esportivo = ? ' +
        'seda = ? ' +
        'where CodCar = ?',
        [
            codcar, modelo, diaria, ano, cor, placa, passageiros,
            velocidade, esportivo, seda, id
        ],
        (err) => {
            if(err) return res.status(500).send({error: err});
            res.status(202).send({message:'Atualizado'});
        });
}

export const getCar = (req, res) => {
    const id = req.params.id;
    sql.query('select * from carro where CodCar = ?', [id], (err, results) => {
        if(err) return res.status(500).send({error: err});
        res.status(200).send({result: results[0]});
    });
}