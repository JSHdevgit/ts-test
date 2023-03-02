import {DefaultMenu, MenuBar, ParentMenu} from "@/script/parentRect";
import {IsString}from 'class-validator';
export default class childRect {

    childMenuObj: ChildrenMenu;
    addChildrenNum: number = 1;
    callback: () => void;

    @IsString()
    title: string;

    constructor(title?:string) {
        this.title = title ?? `Child ${this.addChildrenNum}`;

        this.callback = () => {};
        this.childMenuObj = {title: this.title,  callback: () => {}} ;

    }
    addChildrenRect(item: ParentMenu, title?:string) {
        this.title = title ?? `Child ${this.addChildrenNum}`
        const menu: ChildrenMenu = {...this.childMenuObj , title: this.title};
        this.addChildrenNum++

        item.childrenMenu.push(menu);
    }
}

type ExcludeProperty<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>


export interface ChildrenMenu extends DefaultMenu {

}

export interface MenuBar2 extends MenuBar{

}
