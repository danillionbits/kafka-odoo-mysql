const express = require('express');
const kafka = require('kafka-node');
const fs = require('fs');
const sequelize = require('sequelize');

const app = express();
app.use(express.json());

const consumerRunning = () => {
    const db = new sequelize(process.env.MYSQL_URL);

    const Logger = db.define('logger', {
        message: sequelize.STRING
    })

    db.sync({ force: true });

    const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER });
    const consumer = new kafka.Consumer(client, [{ topic: process.env.KAFKA_TOPIC }], {
        autoCommit: false
    });

    consumer.on('message', async (message) => {
        await Logger.create({message: message.value});
    })

    consumer.on('error', (err) => {
        console.log(err);
    })
}

setTimeout(consumerRunning, 10000);

app.listen(process.env.PORT);