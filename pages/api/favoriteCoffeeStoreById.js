import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from '../../lib/airtable';

const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + parseInt(1);

          // update record
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);

          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord);
            res.json(minifiedRecords);
          }
        } else {
          res.json({ message: 'No coffee store found' });
        }
      } else {
      }
    } catch (err) {
      console.error('something went wrong', err);
      res.json({ message: 'Something went wrong', err });
    }
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
};

export default favoriteCoffeeStoreById;
