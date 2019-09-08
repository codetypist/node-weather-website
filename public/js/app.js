console.log('The client side javascript is loaded.')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
    
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(' Well, there is an error.')
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
        
//             }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    
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