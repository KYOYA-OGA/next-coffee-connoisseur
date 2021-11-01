import { findRecordByFilter } from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({
          message: 'id could not be found',
        });
      }
    } else {
      res.json({ message: 'id is required' });
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

export default getCoffeeStoreById;
