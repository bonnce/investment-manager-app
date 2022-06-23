
const TotalScore = ({label,total} : {label:string,total:number})=> 
<div className="container column align-start gap-xsm">
    <p className="label-score">{label}</p>
    <h2 className="total-score">$ {total}</h2>
</div>

export default TotalScore