import {DependencyMatcher} from "./reatomTypes";
import {declareAction, declareAtom} from "@reatom/core";

type MapItems<T> = {
    [item: string]: T,
}

function declareMapAtom<T>(
    name: string,
    getItemKey: (item: T) => string,
    dependencyMatcher?: DependencyMatcher<MapItems<T>>,
) {

    const updateItem = declareAction<T>()
    const removeItems = declareAction<Array<string>>()
    const updateItems = declareAction<Array<T>>()
    const setNewItems = declareAction<Array<T>>()

    return {
        atom: declareAtom<MapItems<T>>(name, {}, on => [
            on(updateItems, (state, items) => {
                const itemsMap: MapItems<T> = {...state}
                items.forEach(item => itemsMap[getItemKey(item)] = item)
                return itemsMap
            }),
            on(updateItem, (state, item) => ({
                ...state,
                [getItemKey(item)]: item,
            })),
            on(removeItems, (state, itemIds) => {
                const newItems = {
                    ...state,
                }
                itemIds.forEach(itemId => {
                    delete newItems[itemId]
                })
                return newItems
            }),
            on(setNewItems, (_, items) => {
                const newItems: MapItems<T> = {}
                items.forEach(item => {
                    newItems[getItemKey(item)] = item
                })
                return newItems
            }),
            dependencyMatcher && dependencyMatcher(on)
        ]),
        updateItem,
        removeItems,
        updateItems,
        setNewItems,
    }
}

export {
    declareMapAtom,
}