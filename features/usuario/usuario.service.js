import  pool  from '../../data/index.js';

export const consultarTudo = async () => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM usuarios`;
        const [dados, meta_dados] = await cx.query(cmdSql);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM usuarios WHERE usuarios.id = ?';
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const cadastrar = async (Nome, Email, Senha) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'INSERT INTO usuarios(Nome, Email, Senha) VALUES (?, ?, ?)';
        await cx.query(cmdSql, [Nome, Email, Senha]);

        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados, meta_dados] = await cx.query('SELECT * FROM usuarios WHERE id = ?', [lastId]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const atualizar = async (id, Nome, Email, Senha) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
        await cx.query(cmdSql, [Nome, Email, Senha, id]);

        const [dados] = await cx.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const excluir = async (id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'DELETE FROM usuarios WHERE id = ?';
        const [result] = await cx.query(cmdSql, [id]);
        cx.release();
        return result;
    } catch (error) {
        throw error;
    }
};