import Organization from '@entities/organization.js';
import { AlreadyExists } from '@errors/AlreadyExists.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { IEncrypter } from '@services/interfaces/IEncrypter.js';

export type CreateOrgRequest = {
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

export class CreateOrgUseCase {
  constructor(
    private readonly orgRepository: IOrgRepository,
    private readonly encrypter: IEncrypter
  ) {}

  async execute(orgData: CreateOrgRequest): Promise<Organization> {
    const foundByEmail = await this.orgRepository.findByEmail(orgData.email);

    if (foundByEmail) {
      throw new AlreadyExists('Organization already exists');
    }

    const hashedPassword = await this.encrypter.hash(orgData.password, 10);

    const org = new Organization({ ...orgData, password: hashedPassword });

    const response = await this.orgRepository.create(org);

    return response;
  }
}
