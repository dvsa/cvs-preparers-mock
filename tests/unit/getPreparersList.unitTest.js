/* global describe it context */
const PreparersDAOMock = require('../../src/models/PreparersDAOMock')
const PreparersService = require('../../src/services/PreparersService')
const HTTPResponseStatus = require('../../src/models/HTTPResponseStatus')
const fs = require('fs')
const path = require('path')
const expect = require('chai').expect

describe('getPreparersList', () => {
  var preparersDAOMock = new PreparersDAOMock()

  describe('when database is on', () => {
    context('database call returns valid data', () => {
      it('should return the expected data', () => {
        preparersDAOMock.preparersRecordsMock = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/resources/mock-preparers.json')))
        preparersDAOMock.numberOfRecords = 29
        preparersDAOMock.numberOfScannedRecords = 29
        const preparersService = new PreparersService(preparersDAOMock)

        return preparersService.getPreparersList()
          .then((returnedRecords) => {
            expect(returnedRecords.length).to.equal(29)
          })
      })
    })
    context('database call returns empty data', () => {
      it('should return error 404', () => {
        preparersDAOMock.preparersRecordsMock = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/resources/mock-preparers.json')))
        preparersDAOMock.numberOfRecords = 0
        preparersDAOMock.numberOfScannedRecords = 0
        const preparersService = new PreparersService(preparersDAOMock)

        return preparersService.getPreparersList()
          .then(() => {
            expect.fail()
          }).catch((errorResponse) => {
            expect(errorResponse).to.be.instanceOf(HTTPResponseStatus)
            expect(errorResponse.statusCode).to.equal(404)
            expect(errorResponse.body).to.equal('No resources match the search criteria.')
          })
      })
    })
  })

  describe('when database is off', () => {
    it('should return error 500', () => {
      preparersDAOMock.preparersRecordsMock = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resources/mock-preparers.json')))
      preparersDAOMock.numberOfRecords = 29
      preparersDAOMock.numberOfScannedRecords = 29
      preparersDAOMock.isDatabaseOn = false
      const preparersService = new PreparersService(preparersDAOMock)

      return preparersService.getPreparersList()
        .then(() => {})
        .catch((errorResponse) => {
          expect(errorResponse).to.be.instanceOf(HTTPResponseStatus)
          expect(errorResponse.statusCode).to.be.equal(500)
          expect(errorResponse.body).to.equal('Internal Server Error')
        })
    })
  })
})
