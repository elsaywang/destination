import ListDataSource from "@react/react-spectrum/ListDataSource";

export default class DataSource extends ListDataSource {
	constructor({ items, onLoadMore }) {
		super();
		this.items = items;
		this.onLoadMore = onLoadMore;
	}

	//override
	async load(sortDescriptor) {
		let data = this.items;
		if (sortDescriptor) {
			data.sort((a, b) =>
				a[sortDescriptor.column.key] < b[sortDescriptor.column.key]
					? -sortDescriptor.direction
					: sortDescriptor.direction
			);
		}
		return data;
	}
	//override
	async loadMore() {
		// load more data
		//return new Promise(resolve => setTimeout(() => resolve(this.items), 2000));
		return typeof this.onLoadMore === "function"
			? await this.onLoadMore()
			: new Promise(resolve => setTimeout(() => resolve(this.items), 2000));
	}

	// async performLoad() {
	// 	// await this.performLoad();
	// }
}
