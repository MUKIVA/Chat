import {Atom, declareAction, declareAtom, PayloadActionCreator} from "@reatom/core"
import {DependencyMatcher} from "./reatomTypes"

function declareAtomWithSetter<T>(
    atomName: string,
    initialValue: T,
    dependencyMatcher?: DependencyMatcher<T>,
): [Atom<T>, PayloadActionCreator<T, string>] {
    const set = declareAction<T>(`[set]${atomName}`)

    const atom = declareAtom<T>([atomName], initialValue, on => [
        on(set, (_, payload) => payload),
        dependencyMatcher && dependencyMatcher(on)
    ])

    return [
        atom,
        set,
    ]
}

export {
    declareAtomWithSetter,
}