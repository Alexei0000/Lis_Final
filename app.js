const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
app.use(cors());

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


// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
