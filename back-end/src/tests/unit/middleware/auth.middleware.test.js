const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const jwtUtils = require('../../../api/utils/jwt.utils');
const authMiddleware = require('../../../api/middlewres/auth.middleware');

const { expect } = chai;
chai.use(sinonChai);

describe('authMiddleware function', () => {
  it('should not authorize connection', () => {
    sinon.stub(jwtUtils, 'validateToken').returns({ validated: false, data: undefined });
    const authorization = 'sdand823rf0jef28yrfh2-9f';
    const res = {};
    const req = { headers: { authorization } };
    const next = () => {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // next = sinon.stub.returns();
    authMiddleware(req, res, next);
    expect(res.status).to.have.been.calledWith(403);
    expect(res.json).to.have.been.calledWith({ message: 'You must provide a valid token' })
    // expect(next).to.have.been.called();
  });

  it('should authorize connection', () => {
    // sinon.stub(jwtUtils, 'validateToken').returns({ validated: true, data: undefined });
    // const authorization = 'sdand823rf0jef28yrfh2-9f';
    // const res = {};
    // const req = { headers: { authorization } };
    // const next = new Function;
    // next = sinon.stub.returns();
    // authMiddleware(req, res, next);
    // expect(next).to.have.been.called();
  });

  afterEach(() => {
    sinon.restore();
  });
});

