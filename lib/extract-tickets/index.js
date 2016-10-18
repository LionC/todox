var extractComments = require('extract-comments');

var TICKET_PATTERN = /^todo/i;

function extractTickets(str) {
    return extractComments(str)
        .filter(isTicket)
        .map(commentToTicket);
}

function isTicket(comment) {
    return TICKET_PATTERN.test(comment.value);
}

function commentToTicket(comment) {
    return {
        title: comment.value,
        asignee: null,
        content: buildContentString(comment),
        line: comment.loc.start.line
    };
}

function buildContentString(comment) {
    return 'Line '
        + comment.loc.start.line
        + '\n\n'
        + comment.raw;
}

module.exports = extractTickets;
