export interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export interface SideBarProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}
