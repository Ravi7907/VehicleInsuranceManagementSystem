const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM claims');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  const { id, policy_id, customer_id, claim_date, type, description, amount, settled_amount, status } = req.body;
  try {
    await db.query('INSERT INTO claims VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [id, policy_id, customer_id, claim_date, type, description, amount, settled_amount, status]);
    res.json({ message: 'Claim added!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  const { type, description, amount, settled_amount, status } = req.body;
  try {
    await db.query('UPDATE claims SET type=$1, description=$2, amount=$3, settled_amount=$4, status=$5 WHERE id=$6',
      [type, description, amount, settled_amount, status, req.params.id]);
    res.json({ message: 'Claim updated!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM claims WHERE id=$1', [req.params.id]);
    res.json({ message: 'Claim deleted!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
