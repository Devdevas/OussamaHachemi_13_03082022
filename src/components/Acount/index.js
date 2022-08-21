import './style.css'

function Acount({ tilte, amount, description }) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{tilte}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
    )
}

export default Acount