const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require('pg');

const waitFiveSeconds = () => {
	return new Promise((resolve) => {
		console.log('Will try to connect in 5 seconds')
		setTimeout(() => resolve(), 5000);
	});
}

const startServer = async () => {
	const pgClient = new Pool({
		user: keys.pgUser,
		host: keys.pgHost,
		database: keys.pgDatabase,
		password: keys.pgPassword,
		port: keys.pgPort,
	})

	let connected = false;

	while (!connected) {
		await waitFiveSeconds();

		pgClient.connect(function (err, client) {
			if (err) {
				console.log("Can not connect to the DB" + err);
			} else {
				connected = true;
			}
		})
	}

	await pgClient
		.query('CREATE TABLE IF NOT EXISTS values(number INT);')
		.catch(err => console.log(err));

	// Redis client setup
	const redis = require('redis');

	const redisClient = redis.createClient({
		host: keys.redisHost,
		port: keys.redisPort,
		retry_strategy: () => 1000
	});

	const redisPublisher = redisClient.duplicate();

	// Express route handlers
	app.get('/', (req, res) => {
		res.send('Hi');
	});

	app.get('/values/all', async (req, res) => {
		const values = await pgClient.query('SELECT * from values');

		res.send(values.rows);
	});

	app.get('/values/current', async (req, res) => {
		redisClient.hgetall('values', (err, values) => {
			res.send(values);
		});
	});

	app.post('/values', async (req, res) => {
		const { index } = req.body;

		if (parseInt(index) > 40) {
			return res.status(422).send('Index too high');
		}

		redisClient.hset('values', index, 'Nothing yet!');
		redisPublisher.publish('insert', index);
		pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

		res.send({ working: true });
	});

	app.listen(5000, (err) => {
		console.log('Listening on port 5000');
	});
};

startServer()