import { Theme } from "misc";
import { useContext } from "react";
import { Link, LinkProps } from "react-router-dom";

const BaseLink = (props:LinkProps) => {
    const {theme} = useContext(Theme)
    const {children, ...restProps} = props
    return <Link {...restProps} className="nav-link" style={{color:theme.text}}>{children}</Link>
}
export default BaseLink