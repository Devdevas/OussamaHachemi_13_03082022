import './style.css'

function FeatureItem({ iconSrc, title, content, iconName }) {
    return (
        <div className="feature-item">
            <img src={iconSrc} alt={iconName} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{content}</p>
        </div>
    )
}

export default FeatureItem