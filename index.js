import express from 'express';
import cors from 'cors';
import usuarioRoutes from './features/usuario/usuario.routes.js';
import tarefaRoutes from './features/tarefa/tarefa.routes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ result: 'ok' });
});

app.use('/atv', usuarioRoutes);

app.use('/atv', tarefaRoutes);

app.listen(3000, () => {
    const data = new Date();
    console.log(`Sistema inicializado: \nInf:${data}`);
    console.log('http://localhost:3000/');
});
