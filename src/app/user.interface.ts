export interface UserInterface {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate?: Date | number;
    street: string;
    zipCode: string;
    city: string;
    notes: string;
}
