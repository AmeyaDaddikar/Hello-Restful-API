function requestTranslation(input) {

  return fetch(`https://ameyadaddikar.github.io/Hello-Restful-API/hello?inputMessage=${input}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow'
  })
}

export {requestTranslation}