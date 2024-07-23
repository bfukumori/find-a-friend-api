import { randomUUID } from 'node:crypto';

type OrganizationProps = {
  owner: string;
  email: string;
  postalCode: string;
  addressName: string;
  addressNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  password: string;
};

export default class Organization {
  constructor(
    public readonly props: OrganizationProps,
    public readonly id: string = randomUUID()
  ) {}
}
