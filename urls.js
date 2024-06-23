const fs = require('fs');
const axios = require('axios');
const path = require('path');
const { URL } = require('url');

const read = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('urls.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const res = data.split('\n').filter(url => url.trim() !== '');
            resolve(res);
        });
    });
};

const fetch = async () => {
    try {
        const urls = await read();
        const fetchPromises = urls.map(async (url) => {
            try {
                const response = await axios.get(url);
                console.log(`Fetched data from ${url}`);
                return { url, data: response.data };
            } catch (err) {
                console.error(`Error fetching ${url}:`, err.message);
                return null; // Return null on error
            }
        });
        const results = await Promise.all(fetchPromises);
        console.log('Fetch complete:');
        return results.filter(result => result !== null); // Filter out null results
    } catch (err) {
        console.error('Error:', err.message);
    }
};

const write = async () => {
    try {
        const htmlArray = await fetch();
        htmlArray.forEach(({ url, data }) => {
            try {
                const hostname = new URL(url).hostname;
                const filePath = path.join(__dirname, hostname);
                fs.writeFile(filePath, data, (err) => {
                    if (err) {
                        console.error(`Error writing file for ${url}:`, err.message);
                    } else {
                        console.log(`File written for ${url} to ${filePath}`);
                    }
                });
            } catch (err) {
                console.error(`Error processing URL ${url}:`, err.message);
            }
        });
    } catch (err) {
        console.error('Error:', err.message);
    }
};

write();
