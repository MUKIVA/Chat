import {Atom} from "@reatom/core";
import {useAtom as useAtomImpl} from "@reatom/react";

function useAtomWithSelector<TI, TO = TI>(atom: Atom<TI>, selector: (atomValue: TI) => TO): TO {
    return useAtomImpl(atom, selector, [])
}

export {
    useAtomWithSelector,
}