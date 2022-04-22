
import { useState } from 'react';
import { EventCardComp } from '../components/EventCard';
import { List } from '../model/list'
import styles from './ListComponent.module.css'



export const ListComponent = (props: List) => {
  const data = props.data
  const [sorted, setSorted] = useState(false)

  const handleClick = () => {
    setSorted(!sorted)
  }



  return (
    <div className={styles.wrapper}>
    <button className='button' onClick={handleClick}>Sort by {sorted ? 'date desc' : 'date asc'}</button>
    <div className={styles.listComp}>
      { sorted ? data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => {
        return <EventCardComp event={event} key={event.id} />
      }) 
      : data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((event) => {
        return <EventCardComp event={event} key={event.id} />
      })}

    </div>
    </div>
  )

}