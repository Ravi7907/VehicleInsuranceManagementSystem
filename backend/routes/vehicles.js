const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM vehicles');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  const { id, customer_id, type, make, model, year, reg_no, color, fuel_type } = req.body;
  try {
    await db.query('INSERT INTO vehicles VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [id, customer_id, type, make, model, year, reg_no, color, fuel_type]);
    res.json({ message: 'Vehicle added!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  const { type, make, model, year, color, fuel_type } = req.body;
  try {
    await db.query('UPDATE vehicles SET type=$1, make=$2, model=$3, year=$4, color=$5, fuel_type=$6 WHERE id=$7',
      [type, make, model, year, color, fuel_type, req.params.id]);
    res.json({ message: 'Vehicle updated!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM vehicles WHERE id=$1', [req.params.id]);
    res.json({ message: 'Vehicle deleted!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
