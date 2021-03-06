import { FETCH_DATA_SOURCES_FULFILLED } from '../../actions/dataSources';
import dataSourcesReducer, { getDataSources } from '../dataSources';

describe('dataSourcesReducer', () => {
    const initialState = [];
    it('should return the initial state', () => {
        expect(dataSourcesReducer(initialState, {})).toEqual(initialState);
    });
    it('should handle FETCH_DATA_SOURCES_FULFILLED', () => {
        const response = [
            {
                pid: 1194,
                name: 'Test Datasource: 1535478301325139132',
                description: 'testDatasourceDescription: 1535478301325',
                status: 'ACTIVE',
                integrationCode: '{&quot;code&quot;:153547830132513789}',
                dataExportRestrictions: [],
                createTime: 1535463901000,
                updateTime: 1535463901000,
                crUID: 833,
                upUID: 833,
                type: 'GENERAL',
                inboundS2S: true,
                outboundS2S: false,
                useAudienceManagerVisitorID: true,
                allowDataSharing: true,
                masterDataSourceIdProvider: false,
                uniqueTraitIntegrationCodes: false,
                uniqueSegmentIntegrationCodes: false,
                marketingCloudVisitorIdVersion: 0,
                idType: 'COOKIE',
                allowDeviceGraphSharing: false,
                supportsAuthenticatedProfile: false,
                deviceGraph: false,
                dataSourceId: 167561,
                containerIds: [],
                samplingEnabled: false,
            },
            {
                pid: 1194,
                name: 'Test Datasource: 1535478301363189506',
                description: 'testDatasourceDescription: 1535478301363',
                status: 'ACTIVE',
                integrationCode: '{&quot;code&quot;:1535478301363130729}',
                dataExportRestrictions: [],
                createTime: 1535463901000,
                updateTime: 1535463901000,
                crUID: 833,
                upUID: 833,
                type: 'GENERAL',
                inboundS2S: true,
                outboundS2S: true,
                useAudienceManagerVisitorID: true,
                allowDataSharing: true,
                masterDataSourceIdProvider: true,
                uniqueTraitIntegrationCodes: false,
                uniqueSegmentIntegrationCodes: false,
                marketingCloudVisitorIdVersion: 0,
                idType: 'COOKIE',
                allowDeviceGraphSharing: false,
                supportsAuthenticatedProfile: false,
                deviceGraph: false,
                dataSourceId: 167562,
                containerIds: [],
                samplingEnabled: false,
            },
            {
                pid: 1194,
                name: 'Test Datasource: 1535478326297146291',
                description: 'testDatasourceDescription: 1535478326297',
                status: 'ACTIVE',
                integrationCode: '{&quot;code&quot;:1535478326297126304}',
                dataExportRestrictions: [],
                createTime: 1535463926000,
                updateTime: 1535463926000,
                crUID: 833,
                upUID: 833,
                type: 'GENERAL',
                inboundS2S: true,
                outboundS2S: false,
                useAudienceManagerVisitorID: true,
                allowDataSharing: true,
                masterDataSourceIdProvider: false,
                uniqueTraitIntegrationCodes: false,
                uniqueSegmentIntegrationCodes: false,
                marketingCloudVisitorIdVersion: 0,
                idType: 'COOKIE',
                allowDeviceGraphSharing: false,
                supportsAuthenticatedProfile: false,
                deviceGraph: false,
                dataSourceId: 167568,
                containerIds: [],
                samplingEnabled: false,
            },
        ];
        const action = {
            type: FETCH_DATA_SOURCES_FULFILLED,
            payload: response,
        };

        expect(dataSourcesReducer(initialState, action)).toEqual(response);
    });

    describe('selectors', () => {
        describe('getDataSources', () => {
            const state = [
                {
                    pid: 1194,
                    name: 'Test Datasource: 1535478301325139132',
                    description: 'testDatasourceDescription: 1535478301325',
                    status: 'ACTIVE',
                    integrationCode: '{&quot;code&quot;:153547830132513789}',
                    dataExportRestrictions: [],
                    createTime: 1535463901000,
                    updateTime: 1535463901000,
                    crUID: 833,
                    upUID: 833,
                    type: 'GENERAL',
                    inboundS2S: true,
                    outboundS2S: false,
                    useAudienceManagerVisitorID: true,
                    allowDataSharing: true,
                    masterDataSourceIdProvider: false,
                    uniqueTraitIntegrationCodes: false,
                    uniqueSegmentIntegrationCodes: false,
                    marketingCloudVisitorIdVersion: 0,
                    idType: 'COOKIE',
                    allowDeviceGraphSharing: false,
                    supportsAuthenticatedProfile: false,
                    deviceGraph: false,
                    dataSourceId: 167561,
                    containerIds: [],
                    samplingEnabled: false,
                },
                {
                    pid: 1194,
                    name: 'Test Datasource: 1535478301363189506',
                    description: 'testDatasourceDescription: 1535478301363',
                    status: 'ACTIVE',
                    integrationCode: '{&quot;code&quot;:1535478301363130729}',
                    dataExportRestrictions: [],
                    createTime: 1535463901000,
                    updateTime: 1535463901000,
                    crUID: 833,
                    upUID: 833,
                    type: 'GENERAL',
                    inboundS2S: true,
                    outboundS2S: true,
                    useAudienceManagerVisitorID: true,
                    allowDataSharing: true,
                    masterDataSourceIdProvider: true,
                    uniqueTraitIntegrationCodes: false,
                    uniqueSegmentIntegrationCodes: false,
                    marketingCloudVisitorIdVersion: 0,
                    idType: 'COOKIE',
                    allowDeviceGraphSharing: false,
                    supportsAuthenticatedProfile: false,
                    deviceGraph: false,
                    dataSourceId: 167562,
                    containerIds: [],
                    samplingEnabled: false,
                },
            ];
            it('should return object arrays with `dataSourceId` and `name` properties', () => {
                expect(getDataSources(state)).toEqual([
                    { dataSourceId: 167561, name: 'Test Datasource: 1535478301325139132' },
                    { dataSourceId: 167562, name: 'Test Datasource: 1535478301363189506' },
                ]);
            });
        });
    });
});
