const axios = require('axios');

const testData = {
  "template": "template2",
  "name": "Henry Do",
  "email": "hdo2846@gmail.com",
  "phone": "6267803322",
  "address": "19009 Radby St",
}
;

axios.post('http://localhost:3000/api/generate', testData, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Response:', response.data);
})
.catch(error => {
  console.error('Error:', error);
});
