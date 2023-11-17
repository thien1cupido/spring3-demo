const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const methodOverride = require('method-override');
const path = require('path');
const handlebars = require('express-handlebars');
const flash = require('connect-flash');
// const cors = require('cors');
const cookieParser = require('cookie-parser')
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST;
const session = require('express-session');

app.use(flash());
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true
    })
);

db.connect();

app.use(cookieParser())
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'))

app.use(morgan('combined'));

app.engine('hbs', handlebars.create({extname: '.hbs', helpers: require('./helpers/handlebars')}).engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);
app.listen(port, hostname, () => {
    console.log(`App listening on port ${port}`);
});