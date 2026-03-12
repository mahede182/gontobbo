const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.GONTOBBO_AI;
axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`)
.then(r => console.log(r.data.models.map(m => m.name + ' - ' + m.supportedGenerationMethods.join(','))))
.catch(e => console.log(e.response?.data? e.response.data : e.message));
