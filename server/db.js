import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();

app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ['POST', 'GET'],
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session(
    {
        secret: '12345',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        }
    }
))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'karthi',
    password: 'ram12345',
    database: 'demo_db'
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`username`,`email`,`password`) VALUES(?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'Error in Node' + err });
        return res.json(result);
    })
})

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    }
    else {
        return res.json({ valid: false })
    }
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * from users where email=? and password=?';
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Message: "Error Inside Server" });
        if (result.length > 0) {
            req.session.username = result[0].username;
            return res.json({ Login: true, username: req.session.username })
        }
        else {
            return res.json({ Login: false })
        }
    })
})

app.listen(8081, () => {
    console.log('connected to the server')
})