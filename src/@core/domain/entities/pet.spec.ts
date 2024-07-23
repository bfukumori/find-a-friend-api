import { AgeGroup, Size } from '@constants/enums.js';
import { describe, expect, it } from 'vitest';
import Pet from './pet.js';

describe('#Pet', () => {
  it('should create a new pet', () => {
    const pet = new Pet(
      {
        name: 'Buddy',
        about: 'Buddy description',
        age: 'YOUNG',
        size: 'SMALL',
        energyLevel: 'HIGH',
        independenceLevel: 'HIGH',
        roomSize: 'SMALL',
        organizationId: 'org-1',
        adopted: false,
        photos: ['photo-1', 'photo-2'],
        requirements: ['requirement-1', 'requirement-2'],
      },
      '123'
    );

    expect(pet.id).toEqual('123');
    expect(pet.props.name).toEqual('Buddy');
    expect(pet.props.age).toEqual(AgeGroup.YOUNG);
    expect(pet.props.size).toEqual(Size.SMALL);
  });
});
