
const eventDifferent=[
    {
      amount: 11111,
      cardId: 'ALICE',
      id: '71ff84a1-8d6e-4f44-b74c-310dbde877de',
      type: 'RESERVATION',
    },
    {
      amount: 11111,
      cardId: 'ALICE',
      id: '0a646991-4898-4751-8bf6-c266a6728885',
      type: 'CONFIRMATION',
    },
  
    {
      amount: 22222,
      cardId: 'BOB',
      id: '2ace1ea9-b57e-4d0c-926c-d570450d17c6',
      type: 'RESERVATION',
    },
    {
      amount: 22222,
      cardId: 'BOB',
      id: '98d4608c-862a-4b46-9839-2faa30a65d30',
      type: 'CANCELLATION',
    },
]

const eventDuplicate=[
    {
        amount: 22222,
        cardId: 'ALICE',
        id: '3d311f2f-1f36-4dc6-81a3-ada9af60f74f', // duplicate id  :O
        type: 'RESERVATION',
      },
    
      {
        amount: 22222,
        cardId: 'ALICE',
        id: '3d311f2f-1f36-4dc6-81a3-ada9af60f74f', // duplicate id  :O
        type: 'RESERVATION',
      },
      {
        amount: 22222,
        cardId: 'ALICE',
        id: '0099ebb1-b63f-46d1-b481-1ff88b75d527',
        type: 'CANCELLATION',
      },
]

const eventIncomplete=[
    {
        amount: 33333,
        cardId: 'ALICE',
        id: 'db811933-8f69-4640-8c95-2ef369629534',
        type: 'RESERVATION',
      },
      {
        amount: 55555,
        cardId: 'BOB',
        id: 'd28c2b4a-17f6-4f95-b9df-5f68b452aaac',
        type: 'RESERVATION',
      },
    
      {
        amount: 9999,
        cardId: 'CHARLIE', // starting event
        id: '71ff84a1-8d6e-4f44-b74c-310dbde877de',
        type: 'RESERVATION',
      },
      {
        amount: 9999,
        cardId: 'CHARLIE', // finishing event
        id: '0a646991-4898-4751-8bf6-c266a6728885',
        type: 'CONFIRMATION',
      },
  ]

function processCardEvents(cardEvents){
    let comleteTransaction={}
    for(let i=0;i<cardEvents.length;i++){
        if(!comleteTransaction[cardEvents[i].cardId] && cardEvents[i].type==='RESERVATION'){
            comleteTransaction[cardEvents[i].cardId]=[cardEvents[i]] 
        }else{
            if(comleteTransaction[cardEvents[i].cardId][0].type==='RESERVATION' && comleteTransaction[cardEvents[i].cardId].length<2 &&  cardEvents[i].type!== 'RESERVATION'){
                comleteTransaction[cardEvents[i].cardId].push(cardEvents[i])
            }
        }
    } 
    for(let key in comleteTransaction){
        if(comleteTransaction[key].length!==2){
            delete comleteTransaction[key]
        }
    }

return comleteTransaction    
}

let result=processCardEvents(eventDifferent)
//let result=processCardEvents(eventDuplicate)
//let result=processCardEvents(eventIncomplete)
console.log(result)