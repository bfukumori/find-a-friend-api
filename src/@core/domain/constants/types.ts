import { AgeGroup, Level, Size } from './enums.js';

type PetSize = keyof typeof Size;
type EnergyLevel = keyof typeof Level;
type IndependenceLevel = keyof typeof Level;
type RoomSize = keyof typeof Size;
type AgeGroupType = keyof typeof AgeGroup;

export { AgeGroupType, EnergyLevel, IndependenceLevel, PetSize, RoomSize };
