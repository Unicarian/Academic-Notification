import { jsPDF } from "jspdf";
import { useRef, useEffect, useState } from "react";

function generatePDF(){
    const doc = new jsPDF();
    doc.text("Hello World!", 10, 10);
    doc.save("report.pdf");
    //doc.output()
    
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


export default function PDFGen(){
    const [modal, setModal] = useState(false);

    return (
    <div id="pdf-btn-container">
        <button onClick={() => setModal(true)}>
            Generate Report
        </button>
        <Modal openModal={modal} closeModal={() => setModal(false)}>
            <img src="./img/logo.jpg" alt="MP Logo"></img>
        </Modal>
    </div>
    )
};

