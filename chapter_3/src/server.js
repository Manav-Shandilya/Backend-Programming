import express from 'express';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);

app.use(express.json())
app.use(express.static(path.join(__dirName, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirName, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`)
})
