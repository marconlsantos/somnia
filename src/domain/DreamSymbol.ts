export default class DreamSymbol {
    protected id: number;
    code: string;
    isUniversal: boolean;

    /**
     *
     */
    constructor(code: string, isUniversal: boolean) {
        this.id = 0;
        this.code = code;
        this.isUniversal = isUniversal;
    }
}