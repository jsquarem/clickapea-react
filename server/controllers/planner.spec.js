const { index } = require('./planner');
let {
  getPlannerDocumentByProfileID,
  addRecipeToPlannerDocument,
  createPlannerDocument,
} = require('../services/plannerService');

jest.mock('../services/plannerService');

const mockResponse = () => {
  const res = {
    statusCode: null,
  };
  res.status = jest.fn(statusCode => {
    res.statusCode = statusCode;
    return res
  });
  res.json = jest.fn(payload => JSON.stringify(payload));
  return res;
};

describe('#index', () => {
  describe('when index is passed valid input...', () => {
    beforeEach(() => {
      getPlannerDocumentByProfileID.mockReset();
    });

    it('it should respond with expected output', async () => {
      const expectedOutput = {foo: 'bar'};

      getPlannerDocumentByProfileID.mockResolvedValueOnce(expectedOutput);

      const req = {user: {profile: 'testProfileId'}};

      const res = mockResponse();
      await index(req, res);

      expect(res.statusCode).toBe(201);
      expect(getPlannerDocumentByProfileID).toHaveBeenCalledTimes(1);
    });
  });

  describe('when index is passed invalid input...', () => {
    it('it should respond with expected output', () => {

    });
  });
})
