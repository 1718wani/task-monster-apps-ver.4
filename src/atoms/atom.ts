import { atom } from 'jotai'
import type { taskForDisplay } from "~/types/AllTypes";

export const HomeTasksAtom = atom<taskForDisplay[]>( [])