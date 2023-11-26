import type { Task } from '@prisma/client';
import { atom } from 'jotai'

export const HomeTasksAtom = atom<Task[]>( [])