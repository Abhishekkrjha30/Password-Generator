/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState,useCallback , useEffect,useRef} from "react"

const App = () => {

  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)

  const [Password,setPassword]=useState('')

  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){
      str=str+"0123456789"
    }
    if(charAllowed){
      str=str+"!@$%^&*(){}[]~_-+=?|"
    }

    for (let index = 1; index <=length; index++) {
      let char = Math.floor(Math.random() * str.length +1);

      pass += str.charAt(char);
      
    }
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordtoClipboard=useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  

  return (

    <>
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-8 mt-20 text-orange-500 bg-slate-900">
    <h1 className="text-center text-white mb-10 text-2xl font-bold">Password Generator</h1>
      <div className=" flex shadow rounded-lg overflow-hidden w-full mb-4">
        <input 
        type="text" 
        value={Password}
        className="outline-none w-full py-2 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}
        />

        <button 
        onClick={copyPasswordtoClipboard}
        className="px-5 py-0.5 outline-none shrink-0 text-white bg-blue-500 font-semibold">Copy</button>

      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">

          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>setLength(e.target.value)}
          />
          <label>Length : {length}</label>

        </div>
         <div className="flex items-center gap-x-1">

          <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={(e)=>{
            setNumberAllowed((prev)=>!prev)
          }}
          
          />
          <label>Numbers</label>

        </div>
        <div className="flex items-center gap-x-1">

          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={(e)=>{
            setCharAllowed((prev)=>!prev)
          }}
          />
          <label>Characters</label>

        </div>

      </div>
    </div>
    
    </>
    
  )
}

export default App