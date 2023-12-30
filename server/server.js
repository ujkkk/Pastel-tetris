import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Assuming 'public' is the folder containing your static files
app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
   const filePath = path.join(__dirname, '..', 'client', 'home.html');
   res.sendFile(filePath);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
 });