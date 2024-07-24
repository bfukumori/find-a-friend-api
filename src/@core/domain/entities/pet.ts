import {
  AgeGroupType,
  EnergyLevel,
  IndependenceLevel,
  PetSize,
  RoomSize,
} from '@constants/types.js';
import { randomUUID } from 'node:crypto';

type PetProps = {
  id?: string;
  name: string;
  about: string;
  age: AgeGroupType;
  size: PetSize;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  roomSize: RoomSize;
  photos?: string[];
  requirements?: string[];
  adopted?: boolean;
  organizationId: string;
};

export default class Pet {
  id: string;
  name: string;
  about: string;
  age: AgeGroupType;
  size: PetSize;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  roomSize: RoomSize;
  photos?: string[];
  requirements?: string[];
  adopted?: boolean;
  organizationId: string;

  constructor(props: PetProps) {
    this.id = props.id || randomUUID();
    this.name = props.name;
    this.about = props.about;
    this.age = props.age;
    this.size = props.size;
    this.energyLevel = props.energyLevel;
    this.independenceLevel = props.independenceLevel;
    this.roomSize = props.roomSize;
    this.photos = props.photos || [];
    this.requirements = props.requirements || [];
    this.adopted = props.adopted || false;
    this.organizationId = props.organizationId;
  }
}
