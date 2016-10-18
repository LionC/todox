var dir = require('node-dir');
var assertError = require('assert').ifError;

var extractTickets = require('../extract-tickets');

function getTicketsFromDir(path, cb) {
    var ret = [];

    dir.readFiles(path, fileToTickets, finished);

    function fileToTickets(err, content, filename, next) {
        assertError(err);

        var tickets = extractTickets(content).map(function(ticket) {
            ticket.file = filename

            return ticket;
        });

        ret = ret.concat(tickets);

        next();
    }

    function finished(err) {
        assertError(err);

        cb(err, ret);
    }
}

module.exports = getTicketsFromDir;
