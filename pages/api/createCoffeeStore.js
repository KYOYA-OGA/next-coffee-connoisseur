import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    // find a record
    const { id, name, address, neighborhood, imgUrl, voting } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          // create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({
              message: 'Please provide name',
            });
          }
        }
      } else {
        res.status(400);
        res.json({
          message: 'Please provide id ',
        });
      }
    } catch (err) {
      console.log('Error creating or finding a store', err);
      res.status(500);
      res.json({ message: 'Error creating or finding a store', err });
    }
  }
};

export default createCoffeeStore;
