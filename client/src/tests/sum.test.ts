import {sum} from './sum'

describe('test1', function () {
    test('positive', () => {
        expect(sum(0, 0)).toBe(0)
    })

    test('tets2', () => {
        expect(sum(-5, 5)).toBe(0)
    })

    test('tets2', () => {
        expect(sum(5, 5)).toBe(10)
    }) 
})