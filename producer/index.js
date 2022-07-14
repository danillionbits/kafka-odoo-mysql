const express = require('express');
const kafka = require('kafka-node');
const fs = require('fs');

const app = express();
app.use(express.json());

const producerRunning = async () => {
    const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER });
    const producer = new kafka.Producer(client);
    console.log("It is running");

    producer.on('ready', async () => {
        fs.readFile('../data/odoo/logs/odoo-server.log', 'utf-8', async (err, data) => {
            await producer.send([{ topic: process.env.KAFKA_TOPIC, messages: data }], (err, data) => {
                if (err) console.log(err);
                else console.log(data);
            })
        })
    })
}

setTimeout(producerRunning, 1000);

app.listen(process.env.PORT);