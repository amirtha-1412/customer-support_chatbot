/**
 * Generate a secure random JWT secret
 * Usage: node scripts/generateSecret.js
 */

const crypto = require('crypto');

const generateSecret = (length = 64) => {
    return crypto.randomBytes(length).toString('hex');
};

console.log('\n🔐 Generated JWT Secret:\n');
console.log(generateSecret());
console.log('\n💡 Copy this secret to your .env file as JWT_SECRET\n');
