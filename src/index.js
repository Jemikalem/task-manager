const app = require('./app')
const port = process.env.PORT

/* const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)

        // callBack(new Error('File must be a PDF'))
        // callBack(undefined, true)
        // callBack(undefined, false)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}) */

/* app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}) */


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})