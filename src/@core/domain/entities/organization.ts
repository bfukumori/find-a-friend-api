import { randomUUID } from 'node:crypto';

type OrganizationProps = {
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
  public readonly id?: string;
  public readonly owner: string;
  public readonly email: string;
  public readonly postalCode: string;
  public readonly addressName: string;
  public readonly addressNumber: string;
  public readonly neighborhood: string;
  public readonly city: string;
  public readonly state: string;
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly whatsapp: string;
  public readonly password: string;

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
