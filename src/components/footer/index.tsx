import { iScore, Theme } from "misc"
import { useContext } from "react"
import TotalScore from "./totalScore"

const Footer = ({scores} :{scores:Array<iScore>})=> {
    const {theme} = useContext(Theme)
return <footer className="container footer gap-md" style={{backgroundColor:theme.thirty,color:theme.text}}>
    {scores.map(score => <TotalScore key={score.label} total={score.total} label={score.label} />)}
</footer>}

export default Footer