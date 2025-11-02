const http = require('http');

const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

module.exports = function(_, req, res) {
  console.log('[Backend] Received request:', req.method, req.url);
  
  if (req.url === '/api/posts' && req.method === 'GET') {
    console.log('[Backend] Fetching posts from JSONPlaceholder...');
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/posts',
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      };
      console.log('[Backend] Request options:', options);

      const fetch = http.request(options, response => {
        console.log('[Backend] Received response from JSONPlaceholder, status:', response.statusCode);
        
        if (response.statusCode !== 200) {
          console.error('[Backend] Error response:', response.statusCode);
          reject(new Error(`Failed to fetch: ${response.statusCode}`));
          return;
        }

        const parts = [];
        response.on('data', chunk => {
          console.log('[Backend] Received data chunk');
          parts.push(chunk);
        });
        response.on('end', () => {
          try {
            const data = Buffer.concat(parts).toString();
            console.log('[Backend] Complete response:', data.slice(0, 100) + '...');
            resolve(res({
              headers,
              content: data
            }));
          } catch (err) {
            console.error('[Backend] Error parsing response:', err);
            reject(err);
          }
        });
      });

      fetch.on('error', err => reject(err));
      fetch.end();
    });
  }
  
  // Return 404 for any other routes
  return res({
    headers: { 'content-type': 'application/json' },
    content: JSON.stringify({ error: 'Not Found' }),
    statusCode: 404,
  });
};
