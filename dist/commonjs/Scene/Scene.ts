import {singleton} from "../until/singleton";
import {Collection} from "wonder-commonlib/dist/commonjs/Collection";

@singleton()
export class Scene{
    public static getInstance(){}

    private objectList:Collection<any> = new Collection();

}
