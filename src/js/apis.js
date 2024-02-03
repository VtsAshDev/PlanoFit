

// //Wpp

// // function getBasal(mulher,homem){
    
// //         var gender = values[3];
// //         console.log(gender.value)
// //         if(gender.value != 'mulher'){
// //             console.log(alo)
// //         }
// //     }




// //chat e form 
// const apiKey = "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"
// const submit = document.querySelector('#send');

// var values = [];
// var chatReturn='';

// submit.addEventListener("click", event =>{
//     event.preventDefault();
//     sendMessage();
//     swal("Hello world!")
//     const dados = document.querySelector("#form");
//     var inputs = dados.getElementsByTagName("input");
//     var select = dados.querySelector("#select-objective")
//     for(var i = 0; i < inputs.length; i++){  
//         var allinput = inputs[i];
//         values.push({name: allinput.name, value: allinput.value });
//     }
//     values.push({name:select.value})

//     console.log(values)
//     getBasal()
//     swal('hello')
// });


// function sendMessage(){
//     var message = document.getElementById('nome')
//     if(!message.value)
//     {
//         alert('Complete o Formulário')
//         return
//     }
//     var status = document.getElementById('status')
//     var btnsubmit = document.getElementById('send')
//     status.style.display = 'block'
//     status.innerHTML ="Carregando..."
//     btnsubmit.disabled = true;
//     btnsubmit.style.cursor = 'not-allowed'
//     message.disabled = true

//     fetch("https://api.openai.com/v1/completions", {
//     method: 'POST',
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//         model:"gpt-3.5-turbo-instruct",
//         prompt:message.value,
//         max_tokens: 2048,
//         temperature:0.5
//     })
// })

//     .then((response) => response.json())
//     .then((response) => {
//         chatReturn = response.choices[0].text
//         status.style.display = 'none'
//         chatResponseContent(chatReturn)
//     })
//     .catch((error)=> {
//         console.log(error,'Deu erro Verifique ')
//     })
//     .finally(()=>{
//         btnsubmit.disabled = false;
//         btnsubmit.style.cursor = 'pointer'
//         message.disabled = false
//     })
// }


// function chatResponseContent(response){
// var historic = document.getElementById('historic')



// //respose messages
// var boxchatResponseMessage = document.createElement('p')
// boxchatResponseMessage.className = 'box-response-message'
// var chatResponse = document.createElement('p')
// chatResponse.className = 'chat-message'
// chatResponse.innerHTML = response

// boxchatResponseMessage.appendChild(chatResponse)
// historic.appendChild(boxchatResponseMessage)


// }











// // let send = document.querySelector('#send')

// // send.addEventListener('click',event =>{
// //     event.preventDefault();
// //     handleSubmitForm();
// // })

// // function handleGetFormValues(){
// //     const whatsapp = document.getElementById('whatsapp').value
// //     const message = document .getElementById('message').value

// //     if(typeof whatsapp !== 'string' || whatsapp ===""){
// //         return alert('Digite um número de Whatsapp válido')
// //     }
// //     if(typeof message !== 'string' || message === ""){
// //         return alert ("Digite uma mensagem")
// //     }
// //     return{
// //         whatsapp,
// //         message
// //     }
// // }

// // async function handleSubmitWhatsappMessage(phone,message){
// //     const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message"

// // const response = await fetch(GZAPPY_URL, {
// //   method: 'POST',
// //   headers: {
// //     'Content-Type': 'application/json',
// //     "user_token_id": '648b6267-dfaf-4c82-9131-bc17444f34ed'
// //   },
// //   body: JSON.stringify({
// //     instance_id: "EJIUWMULK81JFQ0C7QAL9W5D",
// //     instance_token: "3f29d85e-bb36-4073-8b2a-3a3333b47c5e",
// //     message: [message],
// //     phone: phone
// //   })
// // })

// // const data = await response.json()

// // console.log(data)


// // }


// // async function handleSubmitForm(){
// //     const data = handleGetFormValues();
// //     console.log(data)
// //     if(data){
// //         await handleSubmitWhatsappMessage(data.whatsapp,data.message)
// //         console.log(data.whatsapp)
// //     }
// // }console.log('vtnc')