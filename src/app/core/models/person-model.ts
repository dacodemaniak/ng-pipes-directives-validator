export class PersonModel {
    public lastName: string;
    public firstName: string;
    public password?: string;
    public email?: string;

    public constructor() {
        this.lastName = '';
        this.firstName = '';
        this.password = '';
        this.email = '';
    }
}
