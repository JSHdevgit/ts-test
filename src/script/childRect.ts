import {DefaultMenu, MenuBar, ParentMenu} from "@/script/parentRect";
import {IsString, MinLength, validateOrReject} from 'class-validator';
export default class childRect {

    childMenuObj: ChildrenMenu;
    addChildrenNum: number = 1;
    callback: () => void;

    @MinLength(1)
    @IsString()
    title: string;

    constructor(title?:string) {
        this.title = title ?? `Child ${this.addChildrenNum}`;
        this.callback = () => {};
        this.childMenuObj = {title: this.title,  callback: () => {}} ;

    }
    async addChildrenRect(item: ParentMenu, title?:string) {
        this.title = title ?? `Child ${this.addChildrenNum}`
        await validateOrReject(this).then((e) => {
            this.addChildrenNum++
            const menu: ChildrenMenu = {...this.childMenuObj, title: title ?? `Child ${this.addChildrenNum}`};
            item.childrenMenu.push(menu);
        }).catch(e => {
            console.error('자식에러',e)
            throw TypeError(e);
        })
    }
}

type ExcludeProperty<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>


export interface ChildrenMenu extends DefaultMenu {

}

export interface MenuBar2 extends MenuBar{

}
