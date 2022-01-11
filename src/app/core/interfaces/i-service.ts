export interface IService<T> {
    findAll(): T[];

    findOne(name: string): T | undefined;
}
