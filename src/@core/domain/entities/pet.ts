import {
  AgeGroupType,
  EnergyLevel,
  IndependenceLevel,
  PetSize,
  RoomSize,
} from '@constants/types.js';
import { randomUUID } from 'node:crypto';

type PetProps = {
  name: string;
  about: string;
  age: AgeGroupType;
  size: PetSize;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  roomSize: RoomSize;
  photos: string[];
  requirements: string[];
  adopted: boolean;
  organizationId: string;
};

export default class Pet {
  constructor(
    public readonly props: PetProps,
    public readonly id: string = randomUUID()
  ) {}
}
