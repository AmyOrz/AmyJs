import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import * as rx from "rxjs"
export class MaterialLoader {
    public static create() {
        var obj = new this();

        return obj;
    }

    public materials: Collection<MaterialModel> = new Collection<MaterialModel>();

    private _currentMaterial: MaterialModel;


    public convert(result, fileContent: any): any {

        return rx.Observable.create((observer) => {

            var materials = {};

            this._convertMaterial(fileContent);

            this.materials.forEach((material: MaterialModel) => {

                var materialData: any = {},
                    valueData = {};

                if (material.opacity != void 0) {
                    if (material.opacity < 1) {
                        materialData.transparent = true;
                    }
                    else {
                        materialData.transparent = false;
                    }

                    materialData.transparency = material.opacity;
                }

                this._addData(valueData, "diffuse", material.diffuseColor)
                this._addData(valueData, "specular", material.specularColor)
                this._addData(valueData, "emission", material.emissionColor)
                this._addData(valueData, "shininess", material.shininess)

                materialData.values = valueData;
                materials[material.name] = materialData;
            });

            result.materials = materials
            observer.next(result)
        });
    }

    private _addData(valueData: any, key: string, data: any) {
        if (!!data) {
            valueData[key] = data;
        }
    }

    private _convertMaterial(fileContent: string) {
        const DELIMITER_PATTERN = /\s+/;
        var lines = fileContent.split("\n");

        lines.forEach((line: string, i: number) => {
            var pos = line.indexOf(" ");
            var key = this._parseKey(line, pos);
            var value = this._parseValue(line, pos);

            if (line.length === 0 || key == "#" || line == '') return;

            if (key == "newmtl") {

                this._currentMaterial = MaterialModel.create();
                this._currentMaterial.name = value;
                this.materials.addChild(this._currentMaterial);

            }
            else if (key == "kd") {
                // Diffuse color (color under white light) using RGB values
                this._setColor("diffuseColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key == "ka") {
                // Ambient color (color under shadow) using RGB values
                //todo support
            }
            else if (key === "ks") {
                // Specular color (color when light is reflected from shiny surface) using RGB values
                this._setColor("specularColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ke") {
                this._setColor("emissionColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ni") {
                // this._currentMaterial.shininess = parseFloat(value);
            }
            else if (key === "ns") {
                this._currentMaterial.shininess = parseFloat(value);
            }
            else if (key === "d") {
                this._currentMaterial.opacity = parseFloat(value);
            }
            else if (key === "map_ka") {
                // ambient map
                //todo support
            }
            else if (key === "map_kd") {
                // Diffuse map
                this._currentMaterial.diffuseMapUrl = value;
            }
            else if (key === "map_ks") {
                // Specular map
                this._currentMaterial.specularMapUrl = value;
            }
            else if (key === "map_ke") {
                // Emission map
                this._currentMaterial.emissionMapUrl = value;
            }
            else if (key === "map_bump") {
                // Bump map
                this._currentMaterial.bumpMapUrl = value;
            }
            else if (key === "map_d") {
                // The dissolve of the material

                //todo support
            }
            else if (key === "illum") {
                //todo support
            }
            else {
                console.log(`Unhandled expression at line : ${i + 1}\nvalue:${line}`);
            }
        })
    }

    private _setColor(colorType: string, colorStrArr: string[]) {
        this._currentMaterial[colorType] = colorStrArr
    }

    private _parseKey(line: string, pos: number) {
        return line.slice(0, pos).toLowerCase();
    }

    private _parseValue(line: string, pos: number) {
        return line.slice(pos + 1);
    }
}
export class MaterialModel {

    public static create() {
        var obj = new this();

        return obj;
    }

    public name: string = null;
    public diffuseColor: Array<number> = null;
    public specularColor: Array<number> = null;
    public emissionColor: Array<number> = null;
    public opacity: number = null;
    public shininess: number = null;
    public diffuseMapUrl: string = null;
    public specularMapUrl: string = null;
    public emissionMapUrl: string = null;
    public bumpMapUrl: string = null;
}