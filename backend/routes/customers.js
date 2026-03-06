const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  const { id, name, email, phone, city, joined_date, status } = req.body;
  try {
    await db.query('INSERT INTO customers VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [id, name, email, phone, city, joined_date, status]);
    res.json({ message: 'Customer added!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  const { name, email, phone, city, status } = req.body;
  try {
    await db.query('UPDATE customers SET name=$1, email=$2, phone=$3, city=$4, status=$5 WHERE id=$6',
      [name, email, phone, city, status, req.params.id]);
    res.json({ message: 'Customer updated!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM customers WHERE id=$1', [req.params.id]);
    res.json({ message: 'Customer deleted!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
