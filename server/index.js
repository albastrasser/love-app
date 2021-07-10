const PORT = process.env.PORT || 6969;
const app = require('./app');

const init = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Falling in love on Port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
