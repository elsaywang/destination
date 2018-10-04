import * as validationUtils from '../searchValidation';

describe('Search Validation Utils', () => {
    describe('isG6CompliantNumber() should check if string is G6 compliant', () => {
        it('given a number, it should return true', () => {
            expect(validationUtils.isG6CompliantNumber('1234')).toBe(true);
            expect(validationUtils.isG6CompliantNumber('-1234')).toBe(true);
            expect(validationUtils.isG6CompliantNumber('0.1234')).toBe(true);
            expect(validationUtils.isG6CompliantNumber('-0.1234')).toBe(true);
        });

        it('given any value with an alphabetical letter, it should return false', () => {
            expect(validationUtils.isG6CompliantNumber('a')).toBe(false);
            expect(validationUtils.isG6CompliantNumber('a123')).toBe(false);
            expect(validationUtils.isG6CompliantNumber('-a123')).toBe(false);
        });
    });

    describe("isComparisonOperator() shoudl check if operator is one of the valid ['>', '>=', '<', '<=']", () => {
        it('given any one of the valid operators, it should return true', () => {
            ['>', '>=', '<', '<='].map(operator =>
                expect(validationUtils.isComparisonOperator(operator)).toBe(true),
            );
        });

        it('given any value not included in the list, it should return false', () => {
            ['==', '!=', 'contains', 'startswith', 'endswith'].map(operator =>
                expect(validationUtils.isComparisonOperator(operator)).toBe(false),
            );
        });
    });

    describe("isPatternOperator() shoudl check if operator is one of the valid ['==', '!=', 'contains', 'startswith', 'endswith']", () => {
        it('given any one of the valid operators, it should return true', () => {
            ['==', '!=', 'contains', 'startswith', 'endswith'].map(operator =>
                expect(validationUtils.isPatternOperator(operator)).toBe(true),
            );
        });

        it('given any value not included in the list, it should return false', () => {
            ['>', '>=', '<', '<=', '!', '~'].map(operator =>
                expect(validationUtils.isPatternOperator(operator)).toBe(false),
            );
        });
    });

    describe('isValueValid() should check if a value is valid based on passed in operator and value', () => {
        it('should return true when given operator of "==" or "contains" or "!=" or "startswith" or "endswith" and any value', () => {
            expect(validationUtils.isValueValid({ operator: '==', value: '' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '==', value: '1234' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '==', value: 'abcd' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '!=', value: '' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '!=', value: '1234' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '!=', value: 'abcd' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: 'contains', value: '' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: 'contains', value: '1234' })).toBe(
                true,
            );
            expect(validationUtils.isValueValid({ operator: 'contains', value: 'abcd' })).toBe(
                true,
            );
            expect(validationUtils.isValueValid({ operator: 'startswith', value: '' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: 'startswith', value: '1234' })).toBe(
                true,
            );
            expect(validationUtils.isValueValid({ operator: 'startswith', value: 'abcd' })).toBe(
                true,
            );

            expect(validationUtils.isValueValid({ operator: 'endswith', value: '' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: 'endswith', value: '1234' })).toBe(
                true,
            );
            expect(validationUtils.isValueValid({ operator: 'endswith', value: 'abcd' })).toBe(
                true,
            );
        });

        it('should return true when given a comparison operator with a valid value', () => {
            expect(validationUtils.isValueValid({ operator: '>', value: '123' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '<', value: '-123' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '>=', value: '0.012' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '<=', value: '123-1' })).toBe(true);
        });

        it('should return false when given a comparison operator and empty value', () => {
            expect(validationUtils.isValueValid({ operator: '>', value: '' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '<', value: '' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '>=', value: '' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '<=', value: '' })).toBe(false);
        });

        it('should return false when given a comparison operator and a non-numerical value', () => {
            expect(validationUtils.isValueValid({ operator: '>', value: 'a' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '<', value: 'a' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '>=', value: 'a' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '<=', value: 'a' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '>', value: '.j...........' })).toBe(
                false,
            );
        });

        it('should handle quotation marks wrapping the value correctly', () => {
            expect(validationUtils.isValueValid({ operator: '<=', value: '"123-1"' })).toBe(true);
            expect(validationUtils.isValueValid({ operator: '<=', value: '"123"1"' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '<=', value: '"a"' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '<=', value: '213"' })).toBe(false);
            expect(validationUtils.isValueValid({ operator: '<=', value: '213"a' })).toBe(false);
        });
    });

    describe('isKeyEmptyWithValue()', () => {
        it('should return true when given an empty key and non-empty value', () => {
            expect(validationUtils.isKeyEmptyWithValue({ key: '', value: 'ada' })).toBe(true);
        });

        it('should return false when given a non-empty key and empty value', () => {
            expect(validationUtils.isKeyEmptyWithValue({ key: 'abc', value: '' })).toBe(false);
        });

        it('should return false when given a non-empty key and non-empty value', () => {
            expect(validationUtils.isKeyEmptyWithValue({ key: 'abc', value: 'abc' })).toBe(false);
        });

        it('should return false when given a empty key and empty value', () => {
            expect(validationUtils.isKeyEmptyWithValue({ key: '', value: '' })).toBe(false);
        });
    });

    describe('areAllValuesValid() should check if all values in key value pairs are valid', () => {
        it('given an array of key value pairs with all valid values, it should return true', () => {
            const keyValuePairs = [
                {
                    key: '',
                    operator: '==',
                    value: '',
                },
                {
                    key: 'abc',
                    operator: '!=',
                    value: '',
                },
                {
                    key: 'abc',
                    operator: 'contains',
                    value: 'abc',
                },
                {
                    key: 'abc',
                    operator: 'startswith',
                    value: 'a',
                },
                {
                    key: 'abc',
                    operator: 'endswith',
                    value: 'c',
                },
                {
                    key: 'abc',
                    operator: '>=',
                    value: '1',
                },
            ];

            expect(validationUtils.areAllValuesValid(keyValuePairs)).toBe(true);
        });

        it('given an array of key value pairs with one invalid value, it should return false', () => {
            const keyValuePairs = [
                {
                    key: 'abc',
                    operator: '==',
                    value: 'a',
                },
                {
                    key: 'abc',
                    operator: '>=',
                    value: 'a',
                },
            ];

            expect(validationUtils.areAllValuesValid(keyValuePairs)).toBe(false);
        });
    });

    describe('isAnyKeyEmptyWithValue() should check if any key is empty with value', () => {
        it('given an array of key value pairs with one empty key with non-empty value, it should return true', () => {
            const keyValuePairs = [
                {
                    key: '',
                    operator: '==',
                    value: 'adada',
                },
                {
                    key: 'ada',
                    operator: 'contains',
                    value: 'abc',
                },
            ];

            expect(validationUtils.isAnyKeyEmptyWithValue(keyValuePairs)).toBe(true);
        });

        it('given an array of key value pairs with all valid values, it should return false', () => {
            const keyValuePairs = [
                {
                    key: '',
                    operator: '==',
                    value: '',
                },
                {
                    key: 'ada',
                    operator: 'contains',
                    value: 'abc',
                },
            ];

            expect(validationUtils.isAnyKeyEmptyWithValue(keyValuePairs)).toBe(false);
        });
    });
});
