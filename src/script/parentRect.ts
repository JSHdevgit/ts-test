import {IsString}from 'class-validator';

export default class ParentRect {

    menuObj: ParentMenu;
    dataArray: ParentMenu[] = [];
    addNum: number = 1;
    addNoNum: number = 1;

    @IsString()
    title: string;
    constructor( ins: DefaultMenu, title?:string) {
        this.title = title ?? `Menu ${this.addNum}`;
        this.menuObj = {title: this.title, childrenMenu:[],menuBar: this.menuBar(), callback: () => {},more:true} ;


    }
    menuBar() {
        const menuList = ['자식','형제','아무나'];
        return menuList.map((a:string,index:number):MenuBar => {
            return {name: a, key:index + 1, callBack: (a:string) => {
                    console.log(`${a} 실행`)}};
        })
    }
    addRect(instance: DefaultMenu, title?:string) {
        this.title = title ?? `Menu ${this.addNum}`;
        const menu: ParentMenu = {...JSON.parse(JSON.stringify(this.menuObj)) , title: this.title ,childIns: instance};
        this.addNum++;
        return menu;
    }
    addNoneRect(title?:string) {
        this.title = title ?? `UnKnown ${this.addNoNum}`;
        const menu: UnKnownMenu = {title: this.title, callback: () => {},more: false};
        this.addNoNum++
        return menu;
    }
    check<T>(data: T): T {
        const check: returnCheck<T> = data;
        return data;
    }
    // removeRect(item:MenuObj) {
    //
    //     const index:number = this.dataArray.findIndex(a => a.menuTitle === item.menuTitle);
    //     this.menuObj.subMenu.splice(index + 2,1);
    //     return index;
    // }
}
type returnCheck<T> = {
    [K in keyof T]: T[K]
}


type ReadOnly<T> = {
    readonly [K in keyof T]: T[K]
}

type TypeCheck<T> = {
    [K in keyof T]: T[K];
}

export interface DefaultMenu {
    title: string,
    callback(): void,
    addChildrenRect?: any;
}

export interface ParentMenu extends DefaultMenu{
    menuBar: object[],
    childrenMenu: DefaultMenu[],
    childIns?: DefaultMenu,
    more: boolean,

}

export type MenuBar = {
    key: number;
    name: string;
    callBack: (a:string) => void;
}
// Omit 유틸리티와 동일  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type TestOmit<T, K> = {[item in keyof T as item extends K ? never : item] : T[item]};
export type UnKnownMenu = TestOmit<ParentMenu, 'menuBar' | 'childrenMenu'>;

//
// interface S  {
//     x:number;
//     y:string;
// }
