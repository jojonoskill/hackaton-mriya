  import { useState } from "react";
  import { jsPDF } from "jspdf";
import Popup from "./MedalPopup";

export default function Student() {  
    const [items, setItems ] = useState([{header: 'task1', link: 'https://docs.google.com/document/d/1fIjH0R27GX4EWItsn7tadcxx4Hy7zKYPd9MWujYAeKc/edit?usp=sharing', comments: {aiComment: '', teacherComment: ''}, grade:-1 , additionalTasks: ''}, 
                                  {header: 'task2', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',  comments: {aiComment: '', teacherComment: ''}, grade:-1, additionalTasks: ''}, 
                                  {header: 'task3', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',  comments: {aiComment: '', teacherComment: ''}, grade:-1, additionalTasks: ''}]);
    
    const [selectedFile, setSelectedFile] = useState(null);
 
    const [text, setText] = useState('');

    const handleFileChange = (event, index) => {
      setTimeout(() => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const formData = new FormData();
        formData.append('pdfFile', file)
        fetch('http://localhost:3001/handle-file-message', {
          method: 'post',
          body: formData
        }).then(response => {
          return response.text();
        }).then(async extractedText => {
          const resarr = await extractedText.split('\n\n');

          setItems(items => {
            let newItems = [...items];


            if (newItems.length > 0) {
                newItems[index] = {
                  ...newItems[index],
                  grade: resarr[0].replace(/\D/g, ''), 
                  comments: {...newItems[index].comments, aiComment : resarr[1].replace('Comments: ', '') } ,
                  additionalTasks: resarr[2],
                };
            }

            // Return the new array
            return newItems;
          })
        }).catch(error => {
          console.error(error);
        })

       }, 10)
    }

    const handleAdditionalFilesDownload = (event, index) => {
      const doc = new jsPDF();
      doc.text(items[index].additionalTasks, 10, 10);
      doc.save("additional_tasks.pdf");
    }
  
   
    return (
      <>
        <div>Student page</div>
        <div>tasks to do:</div>
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    {item.header}: <a href={item.link}>link</a>
                    <div>
                        <input type="file" onChange={(event) => handleFileChange(event, index)} />
                    </div>
                    <div>
                      comments :
                    </div>
                    {item.comments.aiComment !== '' && (<div >
                      AI comment: {item.comments.aiComment}
                    </div>)}
                    <div>
                      оцінка: {item.grade === -1? '': item.grade}
                    </div>

                    <div>
                    {
                      item.additionalTasks !== '' && (
                        <div>
                          <p style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginTop:'-5px' }} onClick={(event) => handleAdditionalFilesDownload(event, index)}>
                            Додаткові завдання
                          </p>
                          <div style={{display:"flex", alignItems:'center', justifyContent:'center', marginTop:'-34px'}}>
                            <p>я зробив додаткові завдання</p>
                            <Popup/>
                          </div>
                        </div>
                      )
                    }
                    </div>

                    <br/>
                </div>
              
            ))}
            <div>
              AI bot math
            </div>
        </div>
      </>
    );
  }