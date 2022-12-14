import styles from './post-resume.module.scss'

import Link from 'next/link'
import { FiCalendar, FiUser } from "react-icons/fi";

interface PostSummaryProps {
  uid: string
  title: string
  subtitle: string
  first_publication_date: string
  author: string
}

export function PostSummary(props: PostSummaryProps) {
  return (
    <article className={styles.article}>

      <header className={styles.header}>

        <h1>
          <Link href={`/post/${props.uid}`}>
            <a>{props.title}</a>
          </Link>
        </h1>
        <p> {props.subtitle} </p>
      </header>

      <div className={styles.infos}>

        <time>
          <FiCalendar size={20} />
          <span> {props.first_publication_date} </span>
        </time>
        
        <address>
          <FiUser size={20} />
          <span> {props.author} </span>
        </address>
      </div>
    </article>
  )
}