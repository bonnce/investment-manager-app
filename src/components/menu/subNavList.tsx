import { Link, Route } from "react-router-dom"

const ARRAY = ['ETH','ADA', 'BTC']

const SubNavLink = () => ARRAY.map((i) => <Link to={`/${i}`} key={i} className='nav-link'>{i}</Link>)

const SubNavRoute = () => <>
{ARRAY.map((i) => <Route path={`/${i}`} />)}
</>

export {
    SubNavLink,
    SubNavRoute
}