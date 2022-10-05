const Recipe = require('../models/recipe');

const index = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    console.log(searchTerm, '<-trying');
    const data = await Recipe.aggregate().search({
      autocomplete: {
        query: `${searchTerm}`,
        path: 'title',
        fuzzy: {
          maxEdits: 2,
        },
      },
    });
    const dataArray = data.map((object) => {
      const dataObj = {
        label: object.title,
        id: String(object._id),
      };
      return dataObj;
    });
    console.log(dataArray, '<-dataArray');
    res.send(dataArray);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  index,
};
