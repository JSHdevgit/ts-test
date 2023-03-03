import {IsString, MinLength, validateOrReject, ValidationError} from 'class-validator';

export default class ParentRect {

    menuObj: ParentMenu;
    dataArray: ParentMenu[] = [];
    addNum: number = 1;
    addNoNum: number = 1;

    @MinLength(1)
    @IsString()
    title: string;
    constructor( ins: DefaultMenu, title?:string) {
        this.title = title ?? `Menu ${this.addNum}`;
        this.menuObj = {title: this.title, childrenMenu:[],menuBar: this.menuBar(), callback: () => {
                console.log(this.title)},more:true} ;


    }
    menuBar() {
        const menuList = ['자식','형제','아무나'];
        return menuList.map((a:string,index:number):MenuBar => {
            return {name: a, key:index + 1, callBack: (a:string) => {}};
        })
    }
      async addRect(instance: DefaultMenu, title?: string) {
         this.title = title ?? `Menu ${this.addNum}`;
          const menu: ParentMenu = {
              ...JSON.parse(JSON.stringify(this.menuObj)), title: this.title, childIns: instance, callback: () => {
                  console.log(`${menu.title} 부모 실행`)
              }
          };
          await validateOrReject(this).then(e => {
              this.addNum++;
          }).catch(e => {
              console.error('부모에러:',e[0]);
              throw TypeError(e);
          })
          return menu;



      }
    addNoneRect(title?:string) {
        this.title = title ?? `UnKnown ${this.addNoNum}`;
        const menu: UnKnownMenu = {title: this.title, callback: () => {
                console.log(`${menu.title}클릭`);
            },more: false};
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
    /**
     * 자식 메뉴
     */
    childrenMenu: DefaultMenu[],
    /**
     * 자식 인스턴스
     */
    childIns?: DefaultMenu,
    /**
     * 메뉴 아이콘 활성화 여부
     */
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
