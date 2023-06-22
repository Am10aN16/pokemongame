# Pokemon Adoption App

The Pokemon Adoption App is a virtual pet adoption application that allows users to adopt Pokemon and take care of them by feeding them. The app provides a simulated experience of adopting and caring for virtual pets.

## Features

- User registration and login
- Viewing available Pokemon for adoption
- Adopting a Pokemon (each Pokemon can be adopted only once)
- Feeding the adopted Pokemon to increase their health status
- Automatic decrease in health status if a Pokemon isn't fed for a certain time

## Technologies Used

- Backend: Node.js, Express, MongoDB
- Frontend: React

## Installation

1. Clone the repository:

git clone https://github.com/Am10aN16/pokemongame.git


2. Install the dependencies for both the backend and frontend:

cd pokemon-adoption-app
- npm install

cd client
- npm install


3. Set up the MongoDB database:

- Make sure MongoDB is installed and running on your system.
- Create a new MongoDB database.
- Update the MongoDB connection URL in `index.js` to point to your database.

4. Start the backend and frontend servers:

cd pokemon-adoption-app
- node index.js

cd client
- npm start


5. Access the application in your web browser at `http://localhost:3000`.

## API Endpoints for user
- `POST /user/register`: To register to the application.
- `POST /user/login`: To login into the application.
- `GET /user/infor`: To get the information of logged in user.
- `GET /user/infor`: To get the information of logged in user.
- `GET /user/refresh_token`: To generate the refresh token of logged in user.
- `GET /user/logout`: To logout from the application.

## API Endpoints for pokemons

- `POST /api/addpokemon`: Add Pokemons to database.
- `GET /api/pokemon`: Get the list of available Pokemon for adoption.
- `POST /api/pokemon/:pokemonId/adopt`: Adopt a Pokemon.
- `GET /api/user/:userId/pokemon`: Get the list of adopted Pokemon by a user.
- `POST /api/pokemon/:pokemonId/feed`: Feed a Pokemon to increase its health status.

## Contributing

Contributions to the Pokemon Adoption App are welcome! If you find any issues or would like to add new features, please submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
