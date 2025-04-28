import { jsPDF } from "jspdf";
import { useRef, useEffect, useState } from "react";
import { useStudentData, useStudentPrograms } from '../hooks/useStudentData';



//Create new PDF
//Not formatted perfectly, mainly just gets all the relevent data onto the page
//Does NOT currently support multiple pages
function generatePDF(studentData, programArray, name, gradDate){
    const doc = new jsPDF();

    const date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    const currentDate = `${month}-${day}-${year}`;

    let height = 30;
    let margin = 20;
    let textWidth;


    //Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Degree Audit Report", doc.internal.pageSize.getWidth() / 2, height, {align: "center"});
    height += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text("For " + name + " prepared on " + currentDate, doc.internal.pageSize.getWidth() / 2, height, {align: "center"});
    height += 10;

    doc.text("Status: " + studentData.careers[0].descr, margin, height);
    height += 5;

    doc.text("Expected Graduation Date: "+ gradDate, margin, height);

    height += 20;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text("Requirements to be Completed", margin, height);
    textWidth = doc.getTextWidth("Requirements to be Completed");
    doc.line(margin, height+0.5, margin + textWidth, height+0.5);
    doc.setFont('helvetica', 'normal');

    height += 5;

    //Requirement List
    for(let x in programArray){

        for(let y in programArray[x].studentData.groups){
            doc.setFontSize(14);
            if(programArray[x].studentData.groups[y].satisfied === false){
                height += 10;
                doc.setFont('helvetica', 'bold');
                doc.text(programArray[x].studentData.groups[y].label, margin, height);
                textWidth = doc.getTextWidth(programArray[x].studentData.groups[y].label);
                doc.line(margin, height+0.5, margin + textWidth, height+0.5);
                doc.setFont('helvetica', 'normal');

                height += 5;
            }

            for(let z in programArray[x].studentData.groups[y].requirements){
                doc.setFontSize(12);
                if(programArray[x].studentData.groups[y].requirements[z].satisfied === false){
                    doc.text(String(programArray[x].studentData.groups[y].requirements[z].rl_descr), margin + 5, height);
                    height += 5;
                }
            }
            
        }
    }





    //output type : Filename
    doc.output('dataurlnewwindow', "report.pdf");
    return doc;
};


function Modal({openModal, closeModal, children}){
    const ref = useRef();
    useEffect(() => {
        if(openModal){
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);
    
    return (
        <dialog ref={ref} onCancel={closeModal}>
            {children}
            <button onClick={closeModal}>
                Close
            </button>
        </dialog>
    )
}


export default function PDFGen(props){
    const [modal, setModal] = useState(false);
    let PDFDoc = new jsPDF();
    let studentID = props.id;
    const studentData = props.data;
    const studentPrograms = props.programs;
    const name = props.name;
    const gradDate = props.graduation;


    //Gets array of programs and their requirements
    //Javascript doesnt like calling hooks dynamically, so I had to use a try/catch statement
    let programArray = [];
    for(let x = 0; x < studentPrograms.length; x++){
        try{
            // eslint-disable-next-line react-hooks/rules-of-hooks
            let t = useStudentData(studentID, studentPrograms[x].programCode);
            //console.log(t);
            programArray.push(t);
        } catch{
            console.log("Failed to fetch Student Program Data")
        }
    }



    return (
    <div id="pdf-btn-container">
        <button className="summary-report" onClick={() => {setModal(true); PDFDoc = generatePDF(studentData, programArray, name, gradDate)}}>
            Generate Credit Summary Report
        </button>
        {/* {<Modal openModal={modal} closeModal={() => setModal(false)}>
            <object type="application/pdf" width="100%" height="100%">
                <p> Alt Text </p>
            </object>
            <button onClick={PDFDoc.save}>
                Download
            </button>
        </Modal>} */}
    </div>
    )
};

