import AbstractLibraryClass from "./AbstractLibraryClass";

export class DJSLibrary extends AbstractLibraryClass {
    
    public get userID(): string {
        return this.client.user.id;
    };

    public listen(): void {
        this.client.on("raw", this.raw.bind(this));
    };
}