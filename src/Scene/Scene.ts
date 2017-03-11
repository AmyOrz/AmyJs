import {singleton} from "../until/singleton";
import {Collection} from "wonder-commonlib/dist/es2015/Collection";

@singleton()
export class Scene{
    public static getInstance(){}

    private objectList:Collection<any> = new Collection();

}
