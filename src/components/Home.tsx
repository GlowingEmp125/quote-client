import {gql, useMutation, useQuery} from '@apollo/client';
import {  FormEvent, useEffect, useState } from 'react';
const Home = () => {
  
   let {data,refetch}=  useQuery(gql`
   query Query {
  user {
    _id
    email
    name
    quote {
      _id
      by
      name
   }
   }
}`
);
const [toggle, setToggle] = useState(false);
const [equote, setEquote] = useState("");
const [quoteId, setQuoteId] = useState("");
const edithandle=(newIndex:string)=>{
data.user.map((item:any)=>{
  
    
  let filter=item.quote.filter((i:any)=>i._id===newIndex)
  setQuoteId(newIndex);
  filter.map((item:any)=>{
    setEquote(item.name)
  })

  setToggle(true)
})
}
interface Update{
  updateQuote:{
    message:String
  }
}
const [updateQuote,{error}]=useMutation<Update>(gql`
  mutation Mutation($quoteId:String!,$name:String!){
  updateQuote(quoteId:$quoteId,name:$name){
  message
  }
  }
  `)
const handle=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
await updateQuote({
    variables:{
      quoteId,
      name:equote,
    }
  })
await refetch();
  setToggle(false)
}
useEffect(()=>{
if(error){
  console.log(error.stack)
}
},[error]);
console.log("log");

console.log("new log");

  return (
   <div>
    <div className='home-container'>
      <h1>{localStorage.getItem("token") ?"Your Favorite Quote":"Login To access Your Favorite Quote"}</h1>
     <ul>
      { data && data?.user.map((item:any)=>(
         <>
          {
            item.quote.map((i:any,newIndex:number)=>(
              
               <>
                <li key={newIndex} style={{cursor:"pointer"}} onClick={()=>edithandle(i._id)}>{i.name}  <span>~{item.name}</span></li>
                <hr></hr>
               </>
            ))}
  </>
      ))}
      </ul></div>
        {toggle &&  <div className='update-container'>
          <div className='update-main-container'>
            <div className='heading-icon'>
              <h1>Update Quote</h1>
              <i className='fas fa-close' onClick={()=>setToggle(false)}></i>
            </div>
            <form action="" onSubmit={handle} className='update-form'>
              <input type="text" value={equote} onChange={(e)=>setEquote(e.target.value)} />
              <button type='submit'>Update Quote</button>
            </form>
          </div>
         </div>}
      </div>
  )
}

export default Home
