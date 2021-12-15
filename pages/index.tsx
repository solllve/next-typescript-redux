import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { bugAdded, bugResolved, bugRemoved, fetchApi } from './_app'
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect} from 'react';

const Home: NextPage = ({data}) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state);


  useEffect(() => {
    // show me the updates
    console.log(store);
    fetchApi(data)
  },[dispatch]);

  return (
    <div className={styles.container}>
      <h1>Next Typescript Redux</h1>
      {store.bugs.map(bug => (
        <div key={bug.id}>
          <h2>{bug.title}</h2>
          <p>{bug.description}</p>
          <p>{bug.status}</p>
          <button onClick={() => dispatch(bugResolved(bug.id))}>Resolve</button>
          <button onClick={() => dispatch(bugRemoved(bug.id))}>Remove</button>
        </div>
      ))}
     
      <button onClick={() => dispatch(bugAdded('This is the description'))}>Add Bug</button>
      <button onClick={() => dispatch(fetchApi(data))}>Fetch post</button>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3000/api/hello`)
  const data = await res.json()
  return { props: { data } }
}

export default Home
