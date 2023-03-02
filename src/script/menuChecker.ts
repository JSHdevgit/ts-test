

export default class Rect {

    menuObj: MenuObj;
    dataArray: MenuObj[] = [];
    addNum: number = 1;
    constructor(title?:string) {
        const menuTitle:string = title ?? `Menu ${this.addNum++}`;
        this.menuObj = { menuTitle: menuTitle,subMenu: defaultMenu, show: false};
        this.menuObj.subMenu.push(menuTitle);
        this.dataArray.push(this.menuObj);

    }
    addRect(item:MenuObj) {
        const menu: MenuObj = { menuTitle: `Menu ${this.addNum++}` ,subMenu: defaultMenu, show: false};
        this.menuObj.subMenu.push(menu.menuTitle);
        return menu;
    }
    removeRect(item:MenuObj) {

        const index:number = this.dataArray.findIndex(a => a.menuTitle === item.menuTitle);
        this.menuObj.subMenu.splice(index + 2,1);
        return index;
    }
}

const defaultMenu = ['Add','Remove'];

type ReadOnly<T> = {
   readonly [K in keyof T]: T[K]
}

type DefaultMenu = typeof defaultMenu;

export interface MenuObj {
    menuTitle: string,
    show?: boolean,
    subMenu: string[],
}
