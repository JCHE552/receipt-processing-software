import React from 'react';
import { ChangeEvent,useEffect, useState } from 'react';
import './App.css';



function App() {
  const [file, setFile] = useState(null)//this stores the receipt when trying to upload
  const [error, setError] = useState(null)//this stores errors
  const [query, setQuery] = useState('')//this stores the id input when searching for cash rewards
  const [query2, setQuery2] = useState('')//this stores the id when trying to delete
  const [pointres, setPointres] = useState('')//this stoes the cash points rewards
  const [del, setDel] =useState('') //this stores the status of when you try to delete a receipt
  const [receiptid, setReceiptid] = useState('')//this stoes the receipt id when you upload a receipt




  function handleFile(e) {//upon uploading a json file, it updates file in usestate to be the json file

      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      const data = JSON.parse(e.target.result);
      console.log("Json Data", data);
       setFile(data)
      };

    // }

    

  }

  async function handleUpload(event){//when upload this sends a post reqeust using the file uploaded in the usestate
   
    const response = await fetch('/api/receipts/process',{//fetching the API
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    })

    const json5 = await response.json()

    if (!response.ok){//checks if response is good
      setError(json5.error)
    }else{
      setError(null)
      console.log('new receipt added', json5)
      setReceiptid(json5)
    }

    const targetDiv = document.getElementById('receiptid');//this line and the if else updates the GUI on the right hand side
    if (targetDiv) {
      
      targetDiv.textContent = 'The ID for your receipt is:   ' + json5;

    }else{

      targetDiv.textContent = 'The ID for your receipt is:   ' + 'invalid receipt';

    }

  }




  async function search(event) {//this sends a request to get cash rewards
    const query1 = query

    const response = await fetch('/api/receipts/'+query1+'/points',{//fetching API
      method: "get", 
    })

    const json1 = await response.json()

    if (!response.ok){//this checks if response is good
      setError(json1.error)
    }else{
      setError(null)
      console.log('receipt points returned', json1)
      setPointres(json1)
    }


    const targetDiv = document.getElementById('points1');//this line and the below if else check update the GUI on the right hand block
    if (targetDiv) {
      
      targetDiv.textContent = 'Your cash reward points for this receipt are:   ' + json1;
    }else{
      targetDiv.textContent = 'Your cash reward points for this receipt are:   ' + 'invalid receipt id';
    }

  }



  async function search2(event){//this sends a request to delete
    const query3 = query2

    const response1 = await fetch('/api/receipts/'+query3+'/erase',{//fetching API
      method: "delete", 
    })

    const json3 = await response1.json()

    if (!response1.ok){//if else statement checks if response is good
      setError(json3.error)
    }else{
      setError(null)
      console.log('receipt points returned', json3)
      setDel(json3)
    }

    const targetDiv = document.getElementById('erase1');//this line and the below if else will update the status on the GUI
    if (targetDiv) {
      
      targetDiv.textContent = 'Deletion Status:   ' + json3;
    }else{
      targetDiv.textContent = 'Deletion Status:   ' + 'invalid receipt id';
    }

  }




  return(
    <div className='whole'>
      <main>
       
        <header className = 'head'>
          <div>
            Receipt Processor
          </div>
              
        </header>

        

        <div className = 'row1'>
         <div className='intro'>
            INTRO1
            <br></br>
            <br></br>
            Hello! You've come to generic receipt processor! This website does the following:
            <br></br>
            <br></br>
            <br></br>
            1. Upload your receipt as a JSON file. 
            <br></br>
            <br></br>
            <br></br>
            2. If a valid file is uploaded you will receive an ID back!
            <br></br>
            <br></br>
            <br></br>
            3. You can search for your cash points rewards with that ID!
            <br></br>
            <br></br>
            <br></br>
            4. You can also erase it from our records!
            <br></br>
            <br></br>
            <br></br>
            5. How the points are calculated:
            <br></br>
            - One point for every alphanumeric character in the retailer name.
            <br></br>
            - 50 points if the total is a round dollar amount with no cents.
            <br></br>
            - 25 points if the total is a multiple of 0.25.
            <br></br>
            - 5 points for every two items on the receipt.
            <br></br>
            - If the length of the item description is a multiple of 3, multiply the price by 0.2 and round up. 
            <br></br>
            - The result is number of points. Do the above step and add for all the items.
            <br></br>
            - 6 points if the day in the purchase date is odd.
            <br></br>
            - 10 points if the time of purchase is after 2:00pm and before 4:00pm.
            <br></br>
            <br></br>
            <br></br>
            An example of a valid receipt is available for download below:
            <br></br>
            <br></br>

            
            <a href="receipt1.json" download='receipt.json'>
                <button>Dowload File</button>
            </a>
            

            
          
          </div>

          <div className = 'Upload'>

             What would you like to do with your receipt today?
            <br></br>
            <br></br>
            <br></br>
            <br></br>

             Upload your Receipt!
            <br></br>

            < input type = "file" onChange={handleFile} accept=".json"/>


            <button type = "button" variant = "contained" onClick={handleUpload}>
              Upload
            </button>

             <br></br>
             <br></br>

             <div id='receiptid'>
              The ID for your receipt is: {setReceiptid}
             </div>

             <br></br>
             <br></br>
             <br></br>
             <br></br>

             Search for your cash rewards!

             <br></br>
           

             <input
              type = "text"
              placeholder = "search by id"
              onChange={e => setQuery(e.target.value)}
              value={query}
             />

            <button type = "button" onClick={search}>
                Submit
            </button>

            <br></br>
            <br></br>
          

            <div id='points1'>
              Your cash reward points for this receipt are: {setPointres}
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

             Delete a Receipt!
            <br></br>

            <input
              type = "text"
              placeholder = "search by id"
              onChange={e => setQuery2(e.target.value)}
              value={query2}
            />

            <button type = "button" onClick={search2}>
              Submit
            </button>  

            <br></br>
            <br></br>

            <div id='erase1'>
              Deletion Status: {setDel}
            </div>

          
          </div>

      

        </div>


       
       

      </main>

    </div>

  );
}

export default App;

