import { GetStaticProps } from 'next';
import { useState } from 'react';
import Header from '../components/Header';
import { PostSummary } from '../components/PostSummary';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import { formatInBR } from '../utils/convertDate';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results)
  const [nextPage, setNextPage] = useState(postsPagination.next_page)

  function readMore(next_page) {
    fetch(next_page)
      .then((res) => res.json())
      .then((res) => {
        const newPosts = res.results.map(post => {
          
          let author = ''

                    if (typeof post.data.author == 'string') {
            author = post.data.author
          } else {
            author = post.data.author ? post.data.author.data.name : ''
          }

          return {
            uid: post.uid,
            first_publication_date: post.first_publication_date,
            data: {
              title: post.data.title,
              subtitle: post.data.subtitle,
              author: author
            }
          }
        })

        setPosts(old => [...old, ...newPosts])
        setNextPage(_ => res.next_page)
      })
  }

  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>

      <section className={commonStyles.containerCenter}>
        {posts.map(post => {
          return <PostSummary
            key={post.uid}
            author={post.data.author}
            first_publication_date={formatInBR(post.first_publication_date, 'dd MMM yyyy')}
            uid={post.uid}
            subtitle={post.data.subtitle}
            title={post.data.title}
          />
        })}

        {
          nextPage &&
          <a className={styles.readMore} onClick={() => readMore(nextPage)}>
            Carregar mais posts
          </a>
        }
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 1,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    graphQuery: `{
      posts {
        ...postsFields
        author {
          name
        }
      }
    }`
  });


  const posts: Post[] = postsResponse.results.map(post => {
    
    let author = ''
    
    if (typeof post.data.author == 'string') {
      author = post.data.author
    } else {
      author = post.data.author ? post.data.author.data.name : ''
    }

    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: author
      }
    }
  })

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts
      }
    },
    revalidate: 60 * 2
  }
};
