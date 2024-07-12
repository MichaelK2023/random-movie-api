const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const tmdbApiKey = process.env.TMDB_API_KEY;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


// Fetch popular movies from a specific page
const fetchPopularMoviesFromPage = async (page) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&page=${page}`);
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching popular movies from page ${page} from TMDB:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Fetch the total number of pages for popular movies
const fetchTotalPagesForPopularMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`);
        return response.data.total_pages;
    } catch (error) {
        console.error('Error fetching total pages for popular movies from TMDB:', error.response ? error.response.data : error.message);
        throw error;
    }
}
router.get("/random/movie", async (req, res) => {
	try {
		// Fetch the total number of pages for popular movies

        const totalPages = await fetchTotalPagesForPopularMovies();

        if (totalPages === 0) {
            throw new Error('No popular movies found');
        }

        // generate a random page number between 1 and totalPages
        const randomPage = getRandomInteger(1, 500);

        // fetch popular movies from the random page
        const movies = await fetchPopularMoviesFromPage(randomPage);
        
        if (movies.length === 0) {
            throw new Error(`No popular movies found on page ${randomPage}`)
        }

        // select a random movie from the list of movies
        const randomMovie = movies[getRandomInteger(0, movies.length - 1)];
        res.json(randomMovie);

	} catch (error) {
		console.error(
			"Error fetching TMDB data:",
			error.response ? error.response.data : error.message
		);
		res.status(500).json({ message: "Error fetching random movie" });
	}
});

module.exports = router;