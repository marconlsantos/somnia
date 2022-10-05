import Dream from "./Dream";

export interface IDreamsAPI {
    getDreams: () => Dream[];
}