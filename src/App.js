// import React from "react";
import { useState } from "react";
import { Button, Container, Grid, GridColumn, Image, Item} from "semantic-ui-react";
// import app from"./App.css";
import imageCompression from 'browser-image-compression';


function App() {

  const[origImage,setOrigImage] = useState("");
  const[origImageFile,setOrigImageFile] = useState("");
  const[compressedImage,setCompressedImage] = useState("");
  const[fileName,setFileName] = useState("");

const handle = (e) =>{
    const imageFile = e.target.files[0];
    setOrigImage(imageFile);
    setOrigImageFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
};
const handlecompressimage = (e) => {
    e.preventDefault();

    const options ={
        maxSizeMB :1,
        maxWidthOrHeight:500,
        useWebWorker:true
    }
    if (options.maxSizeMB>=origImage/1024){

        alert("Image is too small,can't be compressed");
        return 0;
    }
    let output;
    imageCompression(origImage,options).then((x) =>{
        output = x;

        const downloadLink = URL.createObjectURL(output);
        setCompressedImage(downloadLink);
    })

};
    return <div className="App">
         <h1></h1>
  <Container>
      <Grid>
  <GridColumn width={6}>
      <Item>
{origImageFile ? (<Image src={origImageFile}></Image>):(<Image src="https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png"></Image>
     )}
      </Item>
  </GridColumn>
  <GridColumn width={4}>
 
  <input
    type="file"
    accept="image/*"
    className="mt-2 btn btn-dark w-75"
     onChange={ e => handle(e)}/>
 <h1></h1>
 {origImageFile && (<Button primary onClick={(e)=>{handlecompressimage(e)}}>
     {" "}
     Compress Image
     </Button>)}
     <h1></h1>
 {compressedImage && (
     <Button primary id="button" >
       <a href={compressedImage} download={fileName}>     
            {" "}
            Download Image
            </a>
            </Button>)}
  </GridColumn>
  <GridColumn width={6}>
    <Item>
{compressedImage ? (<Image src={compressedImage}></Image>):(<Image src="https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png"></Image>
   )}     
 </Item>
  </GridColumn>
      </Grid>
  </Container>
    </div>;
}

export default App;