export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date | number | null;
  formattedBirthDate?: string;
  street: string;
  zipCode: string;
  city: string;
  notes: string;

  /**
   * Creates a new User from an optional object representation.
   * The properties of the object are used to initialize the
   * properties of the User. If the object is null or undefined,
   * the properties of the User are initialized to empty strings
   * and zero.
   * @param obj an optional object representation of the User
   */
  constructor(obj?: any, id?: string) {
    this.id = id || (obj && obj.id ? obj.id : '');
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.formattedBirthDate = obj ? obj.formattedBirthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.notes = obj ? obj.notes : '';
  }

  /**
   * Returns a plain object representation of the User, with all properties
   * included, which can be used for serialization to JSON.
   * @returns {{firstName: string, lastName: string, birthDate: number, street: string, zipCode: number, city: string}}
   */
  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      formattedBirthDate: this.formattedBirthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      notes: this.notes,
    };
  }
}
