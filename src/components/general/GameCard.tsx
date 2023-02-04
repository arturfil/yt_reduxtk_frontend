import React from 'react'
import { Game } from '../../interfaces/Game'
import "./GameCard.css";

interface Props {
    game: Game
}

export default function GameCard({game}: Props) {
  return (
    <div className='game-card'>
        <h2>{game.name}</h2>
        <p>{game.address}</p>
        <p>{game.numberOfPeople}</p>
        <p>{game.time ? game.time : "not time assigned yet"}</p>
        <p>{game.date.toString().split("T")[0].split("-").reverse().join("/")}</p>
    </div>
  )
}
