import express from 'express';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { exec, execFile } from 'child_process'; //Para executar comandos do ubuntu
import cwebp from 'cwebp-bin';

const app = express();

app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/index.html'));
});

app.post('/profile', upload.single('avatar'), (req, res) => {

    console.log(req.file);

    try {
        res.send('UPLOAD OK').status(200);
    } catch (err) {
        console.log(err)
    }
})

app.get('/delete/:name', (req, res) => {
    try {
        let arquivo = req.params.name;
        fs.unlinkSync(path.resolve(__dirname, `./uploads/${arquivo}`))
        res.send('DELETE SUCESS!').status(200);
    } catch (err) {
        console.log(err);
    }
})

app.get('/compress/:name', (req, res) => {

    let arquivo = req.params.name;

    execFile(cwebp,
        [`${path.resolve(__dirname, './uploads/' + arquivo)}`, '-o', `${path.resolve(__dirname, './uploads/compressed/' + arquivo + '.webp')}`], err => {
            if (err) {
                throw err;
            }

            console.log('Image is converted!')
            res.send('COMPRESSED').status(200);
        })
});


app.get('/test', (req, res) => {
    exec('ls -la', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.send('LS -LA NO CONSOLE OK').status(200);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`)
    });
})

app.get('/view', (req, res) => {
    try {
        let files = fs.readdirSync(path.resolve(__dirname, './uploads'));
        files.map((value) => {
            console.log(value);
        })
        console.log(files);
        res.send('CONSOLE')
    } catch (error) {
        console.log(error)
    }
});

const port = 3333;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
