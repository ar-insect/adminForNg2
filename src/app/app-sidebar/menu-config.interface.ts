export interface MenuConfig {
    iconCls: string;
    menuText: string;
    url?: string;
    isShow?: boolean;
    active: boolean;
    subMenu?: {
        iconCls: string;
        menuText: string;
        url: string;
        active: boolean;
    }[];
};