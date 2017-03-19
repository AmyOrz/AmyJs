import { singleton } from "../until/singleton";
import { Scene } from "../Scene/Scene";

@singleton()
export class Director {
    public static getInstance() { }

    public scene: Scene = Scene;


}
