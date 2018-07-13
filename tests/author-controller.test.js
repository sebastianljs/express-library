const authorController = require('../controllers/author-controller');
const Author = require('../models/author');
const sinon = require('sinon');
require('sinon-mongoose');

describe('author-controller route tests',
    () => {
    beforeEach(() => {
    });
    afterEach(() => {
        Author.find.restore();
    });
    it('should list all authors', () => {
        const author1 = {
            first_name: 'Isaac',
            family_name: 'Asimov'
        };
        const author2 = {
            first_name: 'Charles',
            family_name: 'Dickens'
        };
        const expectedAuthors = [author1, author2];
        sinon.mock(Author)
            .expects('find')
            .chain('sort')
            .withArgs([['family_name', 'ascending']])
            .chain('exec')
            .yields(null, expectedAuthors);
        const req = { params: {} };
        const res = {
            render: sinon.stub()
        };
        authorController.authorList(req, res, null);
        sinon.assert.calledWith(
            res.render, 'author-list', {
                title: 'Author List',
                authorList: expectedAuthors
            }
        )
    });
    });
