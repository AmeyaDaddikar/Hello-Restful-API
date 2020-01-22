import React, {useState, useEffect} from 'react';
import {Input, message} from 'antd';

import {requestTranslation} from '../Networking';

const { Search } = Input;

const styles = {
  container: {
    display: 'block',
    margin: 'auto',
    width: '85vw',
    maxWidth: '500px'
  },
  searchbar: {
    display: 'block',
    margin: 'auto',
    width: '70vw',
    maxWidth: '300px'
  },
  answerText: {
    fontSize: '1.5em',
    textAlign: 'center',
    fontWeight: 'lighter',
    marginTop: '15px'

  }
}

export default function Searchbar() {

  let [translatedText, setTranslatedText] = useState('');



  const onSearch = (value) => {

    requestTranslation(value)
    .then(x => x.json().then(v => {
      setTranslatedText(v.message.text[0]);
      message.success('Translation generated.')
    }))
    .catch(y => message.error('There was an error contacting the server.'))
  }

  useEffect(() => onSearch('Hello'), [])


  return(
    <div style={styles.container}>
      <Search
       placeholder="input text to translate text"
       onSearch = {onSearch}
       style={styles.searchbar}
      />
      <p style={styles.answerText}>{translatedText}</p>
    </div>
  )
}