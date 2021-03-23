import sql from '../mysql.js';

export const getUsers = (req, res) => {
    sql.query('select * from cliente', (err, results) => {
        if(err) return res.status(500).send({error: err});
        res.status(200).send({
            resultado: results
        });
    });
}

export const postUser = (req, res) => {
    const codcli = req.body.codcli;
    const name = req.body.name;
    const cnh = req.body.cnh;
    const adress = req.body.adress;
    sql.query(
        'insert into cliente(CodCli, Nome, CNH, Endereco) values(?, ?, ?, ?)',
        [codcli, name, cnh, adress],
        (err, results) => {
            if(err) return res.status(500).send({error: err});
            res.status(201).send({
                message: 'Criado',
            });
        }
    );
}

export const deleteUser = (req, res) => {
    const codcli = req.params.id;
    sql.query(
        'delete from cliente where CodCli = ?',
        [codcli],
        (err) => {
            if(err) return res.status(500).send({error: err});
            res.status(202).send({resultado: 'Deletado Com sucesso'});
        });
}

export const patchUser = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const cnh = req.body.cnh;
    const adress = req.body.adress;
    sql.query(
        'update cliente set Nome=?, CNH=?, Endereco=? ' +
        'where CodCli=?',
        [name, cnh, adress, id],
        (err, results) => {
            if(err) return res.status(500).send({error: err});
            res.status(202).send({
                message: 'Atualizado',
            })
        }
    );
}

export const getUser = (req, res) => {
    const codcli = req.params.id;
    sql.query(
        'select * from cliente where CodCli = ?',
        [codcli],
        (err, results) => {
            if(err) return res.status(500).send({error: err});
            res.status(200).send({
                resultado: results[0]
            });
        });
}