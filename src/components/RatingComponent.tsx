import { useEffect, useState } from 'react'
import { IoMdNuclear } from "react-icons/io";
import styles from './RatingComponent.module.css'
import { RatingProps } from '../model/rating'
import { data } from '../data/data'

export const RatingComp = (props: RatingProps) => {
  const { totalRateValue, timesRated, id } = props
  const [rating, setRating] = useState(0)
  
  const handleRating = (ratingValue: number) => {
    const eventData = data.find(meet => meet.id === id)
    eventData!.timesRated += 1
    eventData!.totalRateValue += ratingValue
    setRating(Math.round(eventData!.totalRateValue / eventData!.timesRated))
  }

  useEffect(() => {
    setRating(Math.round(totalRateValue/timesRated))
  }, [])
  
  return (
    <div >
      {[...Array(5)].map((rate, i) => {
        const ratingValue = i + 1
        return (
          <label key={i}>
            <input 
            data-testid={`rating-${ratingValue}`}
            className={styles.radioInput} 
            type='radio' name='rating' 
            value={ratingValue} 
            onClick={() => handleRating(ratingValue)}/>
            <IoMdNuclear className={`${styles.icons} ${ratingValue <= rating && styles.test1} `}/>
          </label>
        )
      })}
      <span>({rating})</span>
    </div>
  )

}

