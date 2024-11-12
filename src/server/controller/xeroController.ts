import { Response, Request } from 'express'
import axios from 'axios'
import { BalanceSheetType } from '../../client/model/balanceSheet.model'

const BASE_END_POINT = "http://localhost:3000"
const BALNCE_SHEET_ENDPOINT = "/api.xro/2.0/Reports/BalanceSheet" 

export async function fetchXeroBalanceSheetData(req: Request, resp: Response) {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_END_POINT}${BALNCE_SHEET_ENDPOINT}`,
        headers: { }
      };

    try {
        const response = await axios.request(config)
        return resp.status(200).json(response.data.Reports as BalanceSheetType);
    } catch (error) {
        throw new Error("Failed to fetech Balance sheet data from Xero")
    }
}

