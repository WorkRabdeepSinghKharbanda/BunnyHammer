/* eslint-disable @typescript-eslint/no-explicit-any */
import { create }  from 'zustand';

interface GAME_DATA_TYPE {
    startGame: boolean;
    hitScore: number;
    missedScore: number;
    setStartGame: () => void;
    setHitScore: () => void;
    setMissedScore: () => void;
    setResetGame: () => void;
}

export const useGameData = create<GAME_DATA_TYPE>((set) => ({
    startGame: false,
    hitScore: 0,
    missedScore: 0,
    setStartGame: () => set(() => ({
        startGame: true
    })),
    setHitScore: () => set((state:any) => ({
        ...state,
        hitScore: state.hitScore + 1,
    })),
    setMissedScore: () => set((state:any) => ({
        ...state,
        missedScore: state.missedScore + 1,
    })),
    setResetGame: () => set({
        startGame: false,
        hitScore: 0,
        missedScore: 0
    })
}))