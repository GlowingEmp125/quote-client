import { gql, useMutation, useQuery } from '@apollo/client';
import  {  FC, FormEvent, useEffect, useState } from 'react'


interface Quote{
    createQuote:{
        _id:string,
        by:string,
        name:string
    }
}
const CreateQuote:FC = () => {

    let {refetch}=  useQuery(gql`
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




           const [quote, setQuote] = useState("");
         const [createQuote,{error}]=  useMutation<Quote>(gql`
            mutation createQuote($name:String!){
            createQuote(name:$name){
            _id
            by
            name
            }
            }
            `)
    const submithandle=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
if(quote===""){
    alert("Please fill quote field");
    return;
}
if(!localStorage.getItem("token")){
    alert("Please login to create your favorite Quote")
    return ;
}
let {data}=await createQuote({variables:{ name:quote}});
if(data?.createQuote){
    alert("Quote created successfully");
  await refetch();
    setQuote("");

}
    }
    useEffect(()=>{
        if(error){
            alert(error.message);
        }
    },[error])

  return (
    <div className='home-container'>
<h1>Create Your Favorite Quote</h1>
         <form action="" onSubmit={submithandle} className='form-quote'>
                   <input type="text" placeholder='Create new Quote'  value={quote} onChange={(e)=>setQuote(e.target.value)} />
                   <button type='submit' >Create Quote</button>
         </form>
    </div>
  )
}

export default CreateQuote
