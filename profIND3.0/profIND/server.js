const express =  require('express');
const app = express();
const mongoose =  require('mongoose');
const cors = require('cors')



mongoose.connect('mongodb://localhost/profindex', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error',(error) => console.error(error));
db.once('open', () => console.log('Conected to database'));

app.use(express.json());
app.use(cors())
const adminRoute = require('./routes/administrator');
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

//const adminRoute = require('./routes/administrator');
app.use('/administrator', adminRoute);
//app.use('/administrator', adminRoute);   


const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> console.log(`Server stared on port ${PORT}`));
