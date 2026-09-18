import express from 'express';
import * as Usuario from './usuario.service.js';

const router = express.Router();

router.get('/usuario', async (req, res) => {
    try {
        const result = await Usuario.consultarTudo();

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        console.error('Erro na consulta de usuário:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.post('/usuario', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const novoUsuario = await Usuario.cadastrar(nome, email, senha);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.get('/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Usuario.consultarPorId(id);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Recurso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar usuário por ID:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.put('/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, email, senha } = req.body;
        const result = await Usuario.atualizar(id, nome, email, senha);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Recurso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.delete('/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Usuario.excluir(id);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

export default router;
