const fs = require('fs');
const fsPomises = require('fs').promises;
const path = require ("path");

async function logEvents ( mess , logFileName) {
    const now = `${Date.now()}`;
    const toLog = `${now}\t${mess}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPomises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPomises.appendFile(path.join(__dirname, '..', 'logs', logFileName), toLog)
    } catch (err) {
        console.error(err);
    }

}

function logger (req, res, next) {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method}, ${req.path}`);
    next();
}

module.exports = { logger, logEvents };