const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = 'Well, there is an error.'
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = 'The location is '+ data.location
            messageTwo.textContent = 'The forecast for today is '+ data.forecast
        
            }
    })
})
    
})