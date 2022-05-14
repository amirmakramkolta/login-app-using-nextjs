import style from "./sign.module.css"

export default function Sign(props){
    return(
        <div className={style.signBody}>
            <div className={style.leftSign}>
                {props.children}
            </div>
            <div className={style.rightSign}>
                <div className={style.layer}>
                    <h3 className={style.weclome}>Welcome</h3>
                    <hr className={style.hr} />
                    <p className={style.intro}>Sed do eiusmod temporut labore et dolore magna aliqua. Your perfect place to buy & sell </p>
                </div>
            </div>
        </div>
    )
}