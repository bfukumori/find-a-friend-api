import { randomUUID } from 'node:crypto';

export type OrganizationProps = {
  id?: string;
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
  id: string;
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

  constructor(props: OrganizationProps) {
    this.id = props.id || randomUUID();
    this.owner = props.owner;
    this.email = props.email;
    this.postalCode = props.postalCode;
    this.addressName = props.addressName;
    this.addressNumber = props.addressNumber;
    this.neighborhood = props.neighborhood;
    this.city = props.city;
    this.state = props.state;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.whatsapp = props.whatsapp;
    this.password = props.password;
  }
}
