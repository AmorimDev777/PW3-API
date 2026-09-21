import express from 'express';
import * as Tarefa from './tarefa.service.js';

const router = express.Router();

router.get('/tarefa', async (req, res) => {
    try {
        const titulo = req.query.titulo;
        let result;

        if (titulo) {
            result = await Tarefa.consultar(titulo);
        } else {
            result = await Tarefa.consultar();
        }

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        console.error('Erro na consulta de tarefa:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.post('/tarefa', async (req, res) => {
    try {
        const { titulo, descricao, fk_usuario_id, data } = req.body;
        const novaTarefa = await Tarefa.cadastrar(titulo, descricao, fk_usuario_id, data);
        res.status(201).json(novaTarefa);
    } catch (error) {
        console.error('Erro ao cadastrar tarefa:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.get('/tarefa/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Tarefa.consultarPorId(id);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Recurso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar tarefa por ID:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.put('/tarefa/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, descricao, status } = req.body;
        const result = await Tarefa.atualizar(id, titulo, descricao, status);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensagem: 'Tarefa atualizada com sucesso' });
        } else {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

router.delete('/tarefa/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Tarefa.excluir(id);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensagem: 'Tarefa excluída com sucesso' });
        } else {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

export default router;
