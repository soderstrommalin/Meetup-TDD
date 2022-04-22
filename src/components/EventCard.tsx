import React, { useState } from 'react'
import { EventProps } from '../model/event'
import { RatingComp } from './RatingComponent'
import styles from './EventCard.module.css'
import { data } from '../data/data'


export const EventCardComp = (props: EventProps) => {

  const { id, name, description, time, date, attendences, maxParticipants, image, comments, totalRateValue, timesRated } = props.event
  
  const [signUp, SetSignUp] = useState(true)
  
  const [comment, setComment] = useState("");

  const addComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const eventData = data.find(meet => meet.id === id)
    eventData?.comments.push(comment)
    setComment("")
    console.log(eventData?.comments);
  }


  const join = () => {
    const eventData = data.find(meet => meet.id === id)
    signUp ? eventData!.attendences += 1 : eventData!.attendences -= 1
    SetSignUp(prevsignUp => !prevsignUp)
  }


  return (
  <div className={styles.eventWrapper}>
    <div className={signUp ? `${styles.eventCard}` : `${styles.eventCard} ${styles.eventAttend}`}>
      {maxParticipants <= attendences && <div className={styles.bookedBanner}><span>Event full</span></div>}
      <div className={styles.overlay}>
        <div className={styles.overlaycontent}>
        <div className={styles.text}>
          <h1 className={styles.overlayHeader}>{name}</h1>
          <RatingComp id={id} totalRateValue={totalRateValue} timesRated={timesRated} />
          <p className={styles.overlayDesc}>{description}</p>
          <p className={styles.overlayAttend}>Participants: {attendences} / {maxParticipants}</p>
          {maxParticipants > attendences || !signUp ? <button className={styles.cardButton} onClick={join}>{signUp ? 'JOIN' : 'LEAVE'}</button>
          : <p>This event is full!</p>  
        }          
        </div>
        <div className={styles.interaction}>
          <input className={styles.overlayInput} value={comment} type="text" onChange={e => setComment(e.target.value)} onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            addComment(e)
                        }
                    }} placeholder='Add a comment...' />
          <p className={styles.overlayComments}>Comments:<br/> {comments.map((c) => <span key={c} className={styles.comment}>{c}</span>)}</p>
        </div>
        
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.cardImage} src={image} alt="" />
      </div>
      <div className={styles.infowrapper}>
      <h1 className={styles.cardName}>{name}</h1>
      <p className={styles.cardDesc}>{description}</p>
      <p className={styles.cardTime}>{time}</p>
      <p className={styles.cardDate}>{date}</p>
    </div>
    </div>
  </div>)
}
