import { BsPeopleFill } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { GiBattleAxe } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";
import { LinkItemProps } from "./SidebarType";
import { pagesPath } from "~/lib/$path";

export const LinkItems: Array<LinkItemProps> = [
    { name: 'あなたの', icon: FiHome, href: pagesPath.$url().pathname },
    { name: 'みんなの', icon: BsPeopleFill, href:pagesPath.publictasks.$url().pathname   },
    { name: 'いっしょに', icon:GiBattleAxe, href: "" },
    { name: 'ふりかえる', icon: VscGraph, href:  "" },
  ]