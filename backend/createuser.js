const bcrypt = require('bcrypt');

const username = 'atli';
const password = '12345';

async function main() {
    const hash = await bcrypt.hash(password, 10);

    console.log(username, hash);
}

main();