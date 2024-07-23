export interface IEncrypter {
  hash: (plaintext: string, salt: number) => Promise<string>;
  compare: (plaintext: string, hashed: string) => Promise<boolean>;
}
