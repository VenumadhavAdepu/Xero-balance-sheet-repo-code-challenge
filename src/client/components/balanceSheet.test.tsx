/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react'
import { BalanceSheet } from './balanceSheet'
import { useBalanceSheet } from '../context/balanceSheetContext'
import '@testing-library/jest-dom'

jest.mock('../context/balanceSheetContext')

describe('BalanceSheet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing when balanceSheet is empty', () => {
    (useBalanceSheet as jest.Mock).mockReturnValue({
      state: { balanceSheet: { ReportTitles: ['Balance Sheet 2024']} }
    })
    const { getByText } = render(<BalanceSheet />)
    expect(getByText('Balance Sheet')).toBeInTheDocument()
  })

  test('renders balance sheet headers and titles', () => {
    (useBalanceSheet as jest.Mock).mockReturnValue({
      state: {
        balanceSheet: {
          ReportTitles: ['Balance Sheet 2024'],
          Rows: []
        }
      }
    })
    const { getByText } = render(<BalanceSheet />)
    expect(getByText('Balance Sheet 2024')).toBeInTheDocument()
  })

  test('renders table headers correctly', () => {
    (useBalanceSheet as jest.Mock).mockReturnValue({
      state: {
        balanceSheet: {
          ReportTitles: ['Balance Sheet 2024'],
          Rows: []
        }
      }
    })
    const { getByText } = render(<BalanceSheet />)
    expect(getByText('Account')).toBeInTheDocument()
    expect(getByText('Value (Current Year)')).toBeInTheDocument()
    expect(getByText('Value (Previous Year)')).toBeInTheDocument()
  })

  test('renders rows with cells correctly', () => {
    (useBalanceSheet as jest.Mock).mockReturnValue({
      state: {
        balanceSheet: {
          ReportTitles: ['Balance Sheet 2024'],
          Rows: [
            {
              RowType: 'Row',
              Cells: [{ Value: 'Cash' }, { Value: '1000' }, { Value: '800' }]
            }
          ]
        }
      }
    })
    const { getByText } = render(<BalanceSheet />)
    expect(getByText('Cash')).toBeInTheDocument()
    expect(getByText('1000')).toBeInTheDocument()
    expect(getByText('800')).toBeInTheDocument()
  })

  test('renders section rows and nested rows correctly', () => {
    (useBalanceSheet as jest.Mock).mockReturnValue({
      state: {
        balanceSheet: {
          ReportTitles: ['Balance Sheet 2024'],
          Rows: [
            {
              RowType: 'Section',
              Title: 'Assets',
              Rows: [
                {
                  RowType: 'Row',
                  Cells: [{ Value: 'Cash' }, { Value: '1000' }, { Value: '800' }]
                }
              ]
            }
          ]
        }
      }
    })
    const { getByText } = render(<BalanceSheet />)
    expect(getByText('Assets')).toBeInTheDocument()
    expect(getByText('Cash')).toBeInTheDocument()
    expect(getByText('1000')).toBeInTheDocument()
    expect(getByText('800')).toBeInTheDocument()
  })

  test('renders summary rows correctly', () => {
    (useBalanceSheet as jest.Mock).mockReturnValue({
      state: {
        balanceSheet: {
          ReportTitles: ['Balance Sheet 2024'],
          Rows: [
            {
              RowType: 'SummaryRow',
              Cells: [{ Value: 'Total Assets' }, { Value: '5000' }, { Value: '4500' }]
            }
          ]
        }
      }
    })
    const { getByText } = render(<BalanceSheet />)
    expect(getByText('Total Assets')).toBeInTheDocument()
    expect(getByText('5000')).toBeInTheDocument()
    expect(getByText('4500')).toBeInTheDocument()
  })
})
