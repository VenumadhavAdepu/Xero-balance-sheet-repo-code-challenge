import React from 'react'
import { useBalanceSheet } from '../context/balanceSheetContext'
import { Cells, Rows } from '../model/balanceSheet.model'

export const BalanceSheet: React.FC = () => {
	const { state: { balanceSheet } } = useBalanceSheet()

	const renderCells = (cells: Cells[]) =>
		cells.map((cell, index) => <td key={index}>{cell.Value}</td>);

	const renderRows = (rows: Rows[]) =>
		rows.map((row, index) => {
			if (row.RowType === 'Header') {
				return (
					<tr key={index}>
						{row.Cells && renderCells(row.Cells)}
					</tr>
				);
			} else if (row.RowType === 'Section' && row.Title) {
				return (
					<React.Fragment key={index}>
						<tr>
							<th colSpan={3}>{row.Title}</th>
						</tr>
						{row.Rows && renderRows(row.Rows)}
					</React.Fragment>
				);
			} else if (row.RowType === 'Row' || row.RowType === 'SummaryRow') {
				return (
					<tr key={index}>
						{row.Cells && renderCells(row.Cells)}
					</tr>
				);
			}
			return null;
		});

	return (
		<>
			{balanceSheet && Object.keys(balanceSheet).length > 0 &&
				<div>
					{balanceSheet.ReportTitles.map(title => {
						return <h3>{title}</h3>
					})
					}
					<table className="table" border={0}>
						<thead>
							<tr>
								<th>Account</th>
								<th>Value (Current Year)</th>
								<th>Value (Previous Year)</th>
							</tr>
						</thead>
						<tbody>{renderRows(balanceSheet.Rows)}</tbody>
					</table>
				</div>
			}
		</>
	)
}