import { DiamondButton } from "components";
import { BasicAppPage } from "pages";
import cross from 'assets/images/cross.svg'

const Currency = ({title} : {title:string}) =><BasicAppPage title={title}>
<DiamondButton icon={cross} />
</BasicAppPage>

export default Currency