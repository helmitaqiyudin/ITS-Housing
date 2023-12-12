interface DropdownItem {
    title: string;
    subtitle?: string;
    link?: boolean;
    key?: string;
}

interface DropdownDateItem {
    title: string;
    date_start?: Date;
    date_end?: Date;
    subtitle?: string;
    link?: boolean;
    key?: string;
}

export { DropdownItem, DropdownDateItem }