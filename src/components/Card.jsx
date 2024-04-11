import front from '/front.svg'
import './Card.css'

const Card = ({ emoji, handleCardClick, disabled }) => {

  return (
    <button 
      disabled={disabled} 
      className={`card ${emoji.matchFound ? "matched" : ""}`} 
      onClick={() => handleCardClick(emoji.id)}
    >
      <div className="side font">
        <img src={front} alt="frontsvg" width={60}/>
      </div>
      <div className="side back">
        {emoji.symbol}
      </div>
    </button>
  )
}

export default Card