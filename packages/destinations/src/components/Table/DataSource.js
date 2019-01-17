import ListDataSource from '@react/react-spectrum/ListDataSource';

const createDataSourceSubclass = ({
    getInitialData,
    getMoreData,
    triggerGetInitialData,
    triggerGetMoreData,
    sortData,
}) => {
    return new class DataSource extends ListDataSource {
        createFunctionWithPrototypeChainFallback(prototypeFallbackName, fn) {
            return (...args) => {
                if (fn) {
                    return fn(...args);
                }

                return super[prototypeFallbackName](...args);
            };
        }

        async load(sortDescriptor) {
            const initialData = await getInitialData(sortDescriptor);

            this.rowsLoaded = initialData.length;

            return initialData;
        }

        async loadMore() {
            const dataToAppend = await getMoreData(this.rowsLoaded.length);

            this.rowsLoaded += dataToAppend.length;

            return dataToAppend;
        }

        performLoad(sortDescriptor) {
            return this.createFunctionWithPrototypeChainFallback(
                'performLoad',
                triggerGetInitialData,
            )(sortDescriptor);
        }

        performLoadMore() {
            return this.createFunctionWithPrototypeChainFallback(
                'performLoadMore',
                triggerGetMoreData,
            )();
        }

        performSort(sortDescriptor) {
            return this.createFunctionWithPrototypeChainFallback('performSort', sortData)(
                sortDescriptor,
            );
        }
    }();
};

export default createDataSourceSubclass;
