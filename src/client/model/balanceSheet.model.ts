interface Attributes {
    Value: string
    Id: string
}

export interface Cells {
    Value: string
    Attributes?: Attributes[]
}

interface RowsCells {
    RowType: string
    Cells: Cells[]
}

export interface Rows {
    RowType: string
    Title?: string
    Rows?: RowsCells[]
    Cells?: Cells[]
}

export interface Header {
    RowType: string
    Cells: Cells[]
}

export interface BalanceSheetType {
    ReportID: string
    ReportName: string
    ReportType: string
    ReportTitles: [string]
    ReportDate: string
    UpdatedDateUTC: string
    Fields: []
    Header: Header[]
    Rows: Rows[]
}