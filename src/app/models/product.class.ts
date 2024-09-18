export class Product {
    id: string;
    name: string;
    price: string;
    year: number;
  
  
    /**
     * Creates a new Product from an optional object representation.
     * The properties of the object are used to initialize the
     * properties of the User. If the object is null or undefined,
     * the properties of the User are initialized to empty strings
     * and zero.
     * @param obj an optional object representation of the User
     */
    constructor(obj?: any, id?: string) {
      this.id = id || (obj && obj.id ? obj.id : '');
      this.name = obj ? obj.name : '';
      this.price = obj ? obj.price : '';
      this.year = obj ? obj.year : '';
    
    }
  
    /**
     * Returns a plain object representation of the User, with all properties
     * included, which can be used for serialization to JSON.
     * @returns {{firstName: string, lastName: string, birthDate: number, street: string, zipCode: number, city: string}}
     */
    public toJSON() {
      return {
        id: this.id,
        name: this.name,
        price: this.price,
        year: this.year,
   
      };
    }
  }
  