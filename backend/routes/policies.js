const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM policies');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  const { id, customer_id, vehicle_id, type, premium, cover_amount, start_date, end_date, status, insurer } = req.body;
  try {
    await db.query('INSERT INTO policies VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [id, customer_id, vehicle_id, type, premium, cover_amount, start_date, end_date, status, insurer]);
    res.json({ message: 'Policy added!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  const { type, premium, cover_amount, start_date, end_date, status, insurer } = req.body;
  try {
    await db.query('UPDATE policies SET type=$1, premium=$2, cover_amount=$3, start_date=$4, end_date=$5, status=$6, insurer=$7 WHERE id=$8',
      [type, premium, cover_amount, start_date, end_date, status, insurer, req.params.id]);
    res.json({ message: 'Policy updated!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM policies WHERE id=$1', [req.params.id]);
    res.json({ message: 'Policy deleted!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
