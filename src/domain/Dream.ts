import DreamSymbol from './DreamSymbol';

class Dream {
    protected id: number;

    dreamDate: Date;
    title: string;
    narration: string;
    interpretation: string;
    symbols: DreamSymbol[];
    emotions: string[];
    people: string[];
    places: string[];

    /**
     *
     */
    constructor(dreamDate: Date, title: string) {
        this.id = 0;
        this.dreamDate = dreamDate;
        this.title = title;
        this.narration = "";
        this.interpretation = "";
        this.symbols = [];
        this.emotions = [];
        this.people = [];
        this.places = [];
    }
}