import pool from '../../data/index.js';

export const cadastrar = async (titulo, descricao, fk_usuario_id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'INSERT INTO tarefas(fk_usuario_id, titulo, descricao, `status`) VALUES (?, ?, ?, ?)';
        await cx.query(cmdSql, [fk_usuario_id, titulo, descricao, 'PENDENTE']);

        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await cx.query('SELECT * FROM tarefas WHERE id = ?', [lastId]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultar = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        let cmdSql;
        let params = [];
        if (filtro) {
            cmdSql = 'SELECT * FROM tarefas WHERE titulo LIKE ?';
            params = [`%${filtro}%`];
        } else {
            cmdSql = 'SELECT * FROM tarefas';
        }
        const [dados] = await cx.query(cmdSql, params);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cx = await pool.getConnection();
        const [dados] = await cx.query('SELECT * FROM tarefas WHERE id = ?', [id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const atualizar = async (id, titulo, descricao, status) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'UPDATE tarefas SET titulo = ?, descricao = ?, `status` = ? WHERE id = ?';
        const [result] = await cx.query(cmdSql, [titulo, descricao, status, id]);
        cx.release();
        return result;
    } catch (error) {
        throw error;
    }
};

export const excluir = async (id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'DELETE FROM tarefas WHERE id = ?';
        const [result] = await cx.query(cmdSql, [id]);
        cx.release();
        return result;
    } catch (error) {
        throw error;
    }
};