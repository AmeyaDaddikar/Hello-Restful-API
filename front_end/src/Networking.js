function requestTranslation(input) {

  return fetch(`/hello?inputMessage=${input}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow'
  })
}

export {requestTranslation}