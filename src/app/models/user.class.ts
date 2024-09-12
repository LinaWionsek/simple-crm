export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;

    /**
     * Creates a new User from an optional object representation.
     * The properties of the object are used to initialize the
     * properties of the User. If the object is null or undefined,
     * the properties of the User are initialized to empty strings
     * and zero.
     * @param obj an optional object representation of the User
     */
    constructor(obj?: any){
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ?obj.city : '';
    }

    /**
     * Returns a plain object representation of the User, with all properties
     * included, which can be used for serialization to JSON.
     * @returns {{firstName: string, lastName: string, birthDate: number, street: string, zipCode: number, city: string}}
     */
    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
        }
    }
}