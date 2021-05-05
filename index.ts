import bodyParser from 'body-parser';
import express from "express";
import { PrismaClient } from '@prisma/client'

import path from "path";
const app = express();
const port = 3000; // default port to listen

app.use(bodyParser.json());

const prisma = new PrismaClient();

app.post('/api/stores', async (req, res) => {    
  const { body } = req;

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

app.get('/api/items', (req, res) => {
  prisma.item.findMany().then(results => {
      res.status(200).json({ results });
  })
})

app.get('/api/stores', (req, res) => {
  const {
      query: {missing, date },
      method,
  } = req

  const fulldate = new Date(Number(date));

  prisma.store.findMany(
    {
      include: {
          StoresOnItems: true,
          Item: true
      },
      where:
      {
          date: fulldate,
          Item: {
              some:
              { item: missing as string }
          }
      }
  }).then(results => {
      res.status(200).json({ results });
  })
})

app.put('/api/stores/:id', async (req, res) => {

  const reqid = req.params.id;
  const storename=  req.body.storename;

  console.log(reqid);
  console.log(storename);

  const updatedStore = await prisma.store.update({
      data: { storename: storename },
      where: { id: Number(reqid) },
  })

  res.status(200).json({ updatedStore });
})

app.delete('/api/stores/:id', async (req, res) => {

  const reqid = req.params.id;

  const deletedStore  = await prisma.store.delete({
      where: { id: Number(reqid) },
  });

  res.status(200).json({ deletedStore });
})



app.listen(port, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
