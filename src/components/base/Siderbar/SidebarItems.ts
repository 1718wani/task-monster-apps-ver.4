import { BsPeopleFill } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { GiBattleAxe } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";
import { LinkItemProps } from "./SidebarType";

export const LinkItems: Array<LinkItemProps> = [
    { name: 'あなたの', icon: FiHome },
    { name: 'みんなの', icon: BsPeopleFill },
    { name: 'いっしょに', icon:GiBattleAxe },
    { name: 'ふりかえる', icon: VscGraph },
  ]