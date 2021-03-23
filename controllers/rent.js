import sql from '../mysql.js';

export const getRents = (req, res) => {
    sql.query('select * from aluguel', (err, results) => {
        if(err) return res.status(500).send({error: err});
        res.status(200).send({
            result: results
        });
    });
}

export const postRent = (req, res) => {
    const {
        codRent,
        startDate,
        finishDate,
        codcli,
        codcar
    } = req.body;
    sql.query(
        'insert into aluguel values(?, ?, ?, ?, ?)',
        [codRent, startDate, finishDate, codcli, codcar],
        (err) => {
            if(err) return res.status(500).send({error: err});
            res.status(201).send({
                message: 'Criado',
            });
        }
    );
}

export const deleteRent = (req, res) => {
    const codRent = req.params.id;
    sql.query(
        'delete from cliente where CodAlu = ?',
        [codRent],
        (err) => {
            if(err) return res.status(500).send({error: err});
            res.status(202).send({resultado: 'Deletado Com sucesso'});
        });
}

export const patchRent = (req, res) => {
    const codRent = req.params.id;
    const {
        startDate,
        finishDate,
        codcli,
        codcar
    } = req.body;
    sql.query(
        'update aluguel set DataInicio=?, DataFinal=?, CodCli=?, CodCar=? ' +
        'where CodAlu=?',
        [startDate, finishDate, codcli, codcar, codRent],
        (err) => {
            if(err) return res.status(500).send({error: err});
            res.status(202).send({
                message: 'Atualizado',
            })
        }
    );
}

export const getRent = (req, res) => {
    const codRent = req.params.id;
    sql.query(
        'select * from aluguel where CodAlu = ?',
        [codRent],
        (err, results) => {
            if(err) return res.status(500).send({error: err});
            res.status(200).send({
                resultado: results[0]
            });
        });
}