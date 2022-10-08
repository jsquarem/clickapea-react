const { index } = require('./planner');
let {
  getPlannerDocumentByProfileID,
  addRecipeToPlannerDocument,
  createPlannerDocument,
} = require('../services/plannerService');
const { getMockReq, getMockRes } = require('@jest-mock/express');

jest.mock('../services/plannerService');

describe('#index', () => {
  describe('when index is passed valid input...', () => {

    beforeEach(() => {
      getPlannerDocumentByProfileID.mockReset();
    });

    it('it should respond with expected output', async () => {
      const expectedOutput = { foo: [] };
      getPlannerDocumentByProfileID.mockResolvedValueOnce(expectedOutput);

      const req = getMockReq({user: {profile: 'testProfileId'}});
      const { res, next } = getMockRes();

      await index(req, res);

      expect(getPlannerDocumentByProfileID).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(expectedOutput),
      );
    });
  });

  // describe('when index is passed invalid input...', () => {
  //   beforeEach(() => {
  //     getPlannerDocumentByProfileID.mockReset();
  //   });
  //   it('it should respond with error message', async () => {
  //     const req = getMockReq({user: {profile: 'testProfileId'}});
  //     const res = getMockRes();
  //     await index(req, res);
  //
  //     expect(res.statusCode).toBe(500);
  //     expect(getPlannerDocumentByProfileID).toHaveBeenCalledTimes(1);
  //   });
  // });
})
