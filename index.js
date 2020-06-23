require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// parse application/json - VERY IMPORTANT
app.use(bodyParser.json());

app.post('/api/stores', async (req, res) => {    
    const { body } = req;
    
    console.log(body.date);

    const dataToAdd = {
        storename: body.storename,
        location: body.location,
        coordinates: body.coordinates,
        date: new Date(Number(body.date)),
        amount: body.queue,
        Item: {
            create: body.items,
        },
    };

    const store =   await prisma.store.create({ data: dataToAdd});

    res.status(200).json(store);
}); 



app.get('/api/stores', (req, res) => {
    const {
        query: {missing, date },
        method,
    } = req

    const fulldate = new Date(Number(date));

    prisma.store.findMany({
        include: {
            StoresOnItems: true,
            Item: true
        },
        where:
        {
            date: fulldate,
            Item: {
                some:
                { item: missing }
            }
        }
    }).then(results => {
        res.status(200).json({ results });
    })
})

app.listen(port, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});