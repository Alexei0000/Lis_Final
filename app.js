const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: `Lis'em_Final`,
    password: '040207',
    port: 5432, // Default PostgreSQL port
});

app.get('/restaurants', async (req, res) => {
    const { day } = req.query; // Extract 'day' from query parameters

    if (!day || isNaN(day)) {
        return res.status(400).send('Invalid or missing day parameter'); // Validate input
    }

    try {
        const result = await pool.query('SELECT * FROM restaurant WHERE r_day::integer = $1 ORDER BY r_likes', [day]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching restaurants');
    }
});

app.get('/restaurants/type', async (req, res) => {
    const { type } = req.query; // Extract 'type' from query parameters

    if (!type) {
        return res.status(400).send('Invalid or missing type parameter'); // Validate input
    }

    try {
        const result = await pool.query('SELECT * FROM restaurant WHERE restaurant.r_type = $1 ORDER BY r_likes', [type]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching restaurants');
    }
});

app.get('/restaurant-details', async (req, res) => {
    const { id } = req.query; // Extract 'id' from query parameters

    if (!id) {
        return res.status(400).send('Invalid or missing id parameter'); // Validate input
    }

    try {
        const result = await pool.query('SELECT * FROM restaurant WHERE restaurant.r_id = $1 ORDER BY r_likes', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching restaurants');
    }
});

app.post('/restaurants/like', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid or missing id parameter');
    }

    try {
        const result = await pool.query(
            'UPDATE restaurant SET r_likes = r_likes + 1 WHERE r_id = $1',
            [id]
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching restaurants');
    }
})

app.get('/getNumber', async (req, res) => {
    const restaurantId = req.query.restaurantId; // Get the restaurant ID from the query parameter

    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
        // Query the database for the number of likes
        const result = await pool.query('SELECT r_likes FROM restaurant WHERE r_id = $1', [restaurantId]);

        if (result.rows.length > 0) {
            const number = result.rows[0].r_likes; // Extract the likes value
            res.json({ number }); // Respond with the likes
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); // Handle case where no restaurant is found
        }
    } catch (err) {
        console.error('Error fetching likes:', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle server errors
    }
});

app.post('/restaurants/rate1', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid or missing id parameter');
    }

    try {
        const result = await pool.query(
            'UPDATE restaurant SET r_1 = r_1 + 1 WHERE r_id = $1',
            [id]
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching restaurants');
    }
})

app.post('/restaurants/rate2', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid or missing id parameter');
    }

    try {
        const result = await pool.query(
            'UPDATE restaurant SET r_2 = r_2 + 1 WHERE r_id = $1',
            [id]
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching restaurants');
    }
})

app.post('/restaurants/rate3', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid or missing id parameter');
    }

    try {
        const result = await pool.query(
            'UPDATE restaurant SET r_3 = r_3 + 1 WHERE r_id = $1',
            [id]
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching restaurants');
    }
})

app.post('/restaurants/rate4', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid or missing id parameter');
    }

    try {
        const result = await pool.query(
            'UPDATE restaurant SET r_4 = r_4 + 1 WHERE r_id = $1',
            [id]
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching restaurants');
    }
})

app.post('/restaurants/rate5', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid or missing id parameter');
    }

    try {
        const result = await pool.query(
            'UPDATE restaurant SET r_5 = r_5 + 1 WHERE r_id = $1',
            [id]
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching restaurants');
    }
})

app.get('/getNumber', async (req, res) => {
    const restaurantId = req.query.restaurantId; // Get the restaurant ID from the query parameter

    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
        // Query the database for the number of likes
        const result = await pool.query('SELECT r_likes FROM restaurant WHERE r_id = $1', [restaurantId]);

        if (result.rows.length > 0) {
            const number = result.rows[0].r_likes; // Extract the likes value
            res.json({ number }); // Respond with the likes
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); // Handle case where no restaurant is found
        }
    } catch (err) {
        console.error('Error fetching likes:', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle server errors
    }
});

app.get('/get1', async (req, res) => {
    const restaurantId = req.query.restaurantId; // Get the restaurant ID from the query parameter

    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
        // Query the database for the number of 1s
        const result = await pool.query('SELECT r_1 FROM restaurant WHERE r_id = $1', [restaurantId]);

        if (result.rows.length > 0) {
            const number = result.rows[0].r_1; // Extract the 1s value
            res.json({ number }); // Respond with the 1s
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); // Handle case where no restaurant is found
        }
    } catch (err) {
        console.error('Error fetching 1s:', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle server errors
    }
});
app.get('/get2', async (req, res) => {
    const restaurantId = req.query.restaurantId; // Get the restaurant ID from the query parameter

    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
        // Query the database for the number of 1s
        const result = await pool.query('SELECT r_2 FROM restaurant WHERE r_id = $1', [restaurantId]);

        if (result.rows.length > 0) {
            const number = result.rows[0].r_2; // Extract the 1s value
            res.json({ number }); // Respond with the 1s
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); // Handle case where no restaurant is found
        }
    } catch (err) {
        console.error('Error fetching 1s:', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle server errors
    }
});
app.get('/get3', async (req, res) => {
    const restaurantId = req.query.restaurantId; // Get the restaurant ID from the query parameter

    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
        // Query the database for the number of 1s
        const result = await pool.query('SELECT r_3 FROM restaurant WHERE r_id = $1', [restaurantId]);

        if (result.rows.length > 0) {
            const number = result.rows[0].r_3; // Extract the 1s value
            res.json({ number }); // Respond with the 1s
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); // Handle case where no restaurant is found
        }
    } catch (err) {
        console.error('Error fetching 3s:', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle server errors
    }
});
app.get('/get4', async (req, res) => {
    const restaurantId = req.query.restaurantId; // Get the restaurant ID from the query parameter

    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
        // Query the database for the number of 1s
        const result = await pool.query('SELECT r_4 FROM restaurant WHERE r_id = $1', [restaurantId]);

        if (result.rows.length > 0) {
            const number = result.rows[0].r_4; // Extract the 1s value
            res.json({ number }); // Respond with the 1s
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); // Handle case where no restaurant is found
        }
    } catch (err) {
        console.error('Error fetching 4s:', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle server errors
    }
});
app.get('/get5', async (req, res) => {
    const restaurantId = req.query.restaurantId; // Get the restaurant ID from the query parameter

    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
        // Query the database for the number of 1s
        const result = await pool.query('SELECT r_5 FROM restaurant WHERE r_id = $1', [restaurantId]);

        if (result.rows.length > 0) {
            const number = result.rows[0].r_5; // Extract the 1s value
            res.json({ number }); // Respond with the 1s
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); // Handle case where no restaurant is found
        }
    } catch (err) {
        console.error('Error fetching 5s:', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle server errors
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
