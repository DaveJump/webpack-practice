/* eslint-disable */

const assert = require('assert')

describe('Common config cases', () => {
  const { configCommon } = require('../../build/webpack.common')

  it('Should chunks split to 3', () => {
    const { cacheGroups } = configCommon.optimization.splitChunks
    assert.equal(Object.keys(cacheGroups).length, 3)
  })
})
