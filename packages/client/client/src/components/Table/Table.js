import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";
import { TableView } from "@react/react-spectrum/TableView";
import DataSource from "./DataSource";
import {
	defaultRowHeight,
	defaultMaxRows,
	defaultHeadHeight
} from "../../constants/rows";
import styles from "./Table.css";

/**
 * Table component that wraps the react-spectrum table components
 * (`TableView` and `TableViewDataSource`). More easily accepts props
 * for items, columns, table config, and event handlers.
 */
class Table extends Component {
	constructor({ items, onLoadMore }) {
		super();
		this.dataSource = new DataSource({ items, onLoadMore });
	}

	/**
	 * Dynamically set the height of the table's container to show up to a
	 * certain number of rows.
	 */
	getTableHeight({
		items,
		rowHeight = defaultRowHeight,
		maxRows = defaultMaxRows
	}) {
		const bodyHeight = Math.min(items.length, maxRows) * rowHeight;

		return `${defaultHeadHeight + bodyHeight}px`;
	}

	render() {
		const {
			items,
			columns,
			rowHeight,
			renderCell,
			onSelectionChange,
			dataTest,
			allowsSelection
		} = this.props;

		const height = this.getTableHeight({ items, rowHeight });
		return (
			<div
				data-test={dataTest}
				className={classNames("table-wrapper", styles.tableWrapper)}
				style={{ height }}>
				<TableView
					dataSource={this.dataSource}
					columns={columns}
					renderCell={renderCell}
					rowHeight={rowHeight}
					onSelectionChange={onSelectionChange}
					allowsSelection={allowsSelection}
				/>
			</div>
		);
	}
}

Table.propTypes = {
	items: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	renderCell: PropTypes.func.isRequired,
	onLoadMore: PropTypes.func,
	rowHeight: PropTypes.number,
	selectedRowIndexes: PropTypes.array,
	isMaxSelectedRowsReached: PropTypes.bool,
	onSelectionChange: PropTypes.func,
	sortSearch: PropTypes.func,
	dataTest: PropTypes.string,
	allowsSelection: PropTypes.bool
};

export default Table;
