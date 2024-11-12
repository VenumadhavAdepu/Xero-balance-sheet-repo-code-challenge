import { Request, Response } from 'express'
import axios from 'axios'
import { fetchXeroBalanceSheetData } from './xeroController'
import { BalanceSheetType } from '../../client/model/balanceSheet.model'
import mockJson from './mockData.json'

jest.mock('axios', () => ({
    request: jest.fn(() => Promise.resolve({ data: {} })),
  }));
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('fetchXeroBalanceSheetData', () => {
  let req: Partial<Request>
  let resp: Partial<Response>
  let jsonMock: jest.Mock

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn()
    resp = {
      status: jest.fn().mockReturnThis(),
      json: jsonMock,
    }
  })

  it('should fetch balance sheet data successfully and return a 200 status', async () => {
    const mockData = mockJson
    mockedAxios.request.mockResolvedValueOnce({ data: mockData })

    await fetchXeroBalanceSheetData(req as Request, resp as Response)

    expect(resp.status).toHaveBeenCalledWith(200)
    expect(resp.json).toHaveBeenCalledWith(mockData.Reports as unknown as BalanceSheetType)
  })

  it('should throw an error when API call fails', async () => {
    mockedAxios.request.mockRejectedValueOnce(new Error('API Error'))

    await expect(fetchXeroBalanceSheetData(req as Request, resp as Response)).rejects.toThrow(
      'Failed to fetech Balance sheet data from Xero'
    )
  })
})