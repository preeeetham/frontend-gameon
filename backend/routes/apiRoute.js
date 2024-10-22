const express = require('express');
const axios = require('axios');
const apiRouter = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;  
const BASE_URL = 'https://api.rawg.io/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

apiRouter.get('/games', async (req, res) => {
  try {
    const defaultParams = {
      dates: '2023-10-01,2024-10-01',
      ordering: '-added',
      page_size: 20,
    };
    const params = { ...defaultParams, ...req.query };
    const response = await axiosInstance.get('/games', { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

apiRouter.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/games/${id}`);
    res.json(response.data); 
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

apiRouter.get('/genres', async (req, res) => {
  try {
    const response = await axiosInstance.get('/genres');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

apiRouter.get('/platforms', async (req, res) => {
  try {
    const response = await axiosInstance.get('/platforms/lists/parents');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching platforms:', error);
    res.status(500).json({ error: 'Failed to fetch platforms' });
  }
});

apiRouter.get('/stores', async (req, res) => {
  try {
    const response = await axiosInstance.get('/stores');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
});

apiRouter.get('/developers', async (req, res) => {
  try {
    const response = await axiosInstance.get('/developers');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).json({ error: 'Failed to fetch developers' });
  }
});

apiRouter.get('/publishers', async (req, res) => {
  try {
    const response = await axiosInstance.get('/publishers');
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching publishers:', error);
    res.status(500).json({ error: 'Failed to fetch publishers' });
  }
});

apiRouter.get('/search', async (req, res) => {
  try {
    const { query, page } = req.query;
    const response = await axiosInstance.get('/games', {
      params: {
        search: query,
        page: page || 1,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching games:', error);
    res.status(500).json({ error: 'Failed to search games' });
  }
});

apiRouter.get('/games/:id/screenshots', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/games/${id}/screenshots`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    res.status(500).json({ error: 'Failed to fetch game screenshots' });
  }
});

apiRouter.get('/games/:id/movies', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/games/${id}/movies`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching game trailers:', error);
    res.status(500).json({ error: 'Failed to fetch game trailers' });
  }
});

module.exports = apiRouter;
