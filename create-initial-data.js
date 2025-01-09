// 1. Install required packages if not already installed
// npm install @faker-js/faker axios

const { faker } = require('@faker-js/faker');
const axios = require('axios');

const createArtist = () => {
  return {
    name: faker.person.fullName(),
  };
};

// Create a function to generate a single concert
const createConcert = () => {
  return {
    title: faker.music.songName(),
    location: `${faker.location.city()}, ${faker.location.country()}`,
    artistId: faker.number.int({ min: 1, max: 4 }),
    dates: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.date.future(),
    ),
    price: faker.number.int({ min: 10, max: 300 }),
  };
};

const data = [
  // {
  //   name: 'artist',
  //   endpoint: '/artists',
  //   count: 4,
  //   create: createArtist,
  // },
  {
    name: 'concert',
    endpoint: '/concerts',
    count: 20,
    create: createConcert,
  },
];

// Function to send POST requests to localhost:3000/concerts
const sendAPI = () => {
  data.forEach(async ({ name, endpoint, count, create }) => {
    const items = Array.from({ length: count }, () => create());

    for (const item of items) {
      console.log(item);
      try {
        const response = await axios.post(
          `http://localhost:3000${endpoint}`,
          item,
        );
        console.log(`${name} posted:`, response.data);
      } catch (error) {
        console.error(
          'Error posting concert:',
          error.response ? error.response.data : error.message,
        );
      }
    }
  });
};

sendAPI();
