import {Atom, PayloadActionCreator} from "@reatom/core";

export type Reducer<TState, TValue> = (state: TState, value: TValue) => TState

interface DependencyMatcherOn<TState> {
    <T>(dependency: Atom<T>, reducer: Reducer<TState, T>): void
    <T>(dependency: PayloadActionCreator<T>, reducer: Reducer<TState, T>): void
    <T>(
        dependency: Atom<T> | PayloadActionCreator<T>,
        reducer: Reducer<TState, T>,
    ): void
}
export type DependencyMatcher<TState> = (on: DependencyMatcherOn<TState>) => any