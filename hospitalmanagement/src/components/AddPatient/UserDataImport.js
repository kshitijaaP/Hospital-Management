import React, { useState } from "react";
import { parse } from "csv-parse/browser/esm/sync";
import axios from "axios";

export default function UserDataImport() {
    const [file, setFile] = useState();
    const [csvData, setCsvData] = useState([]);
    const fileReader = new FileReader();
    const [iscsv, setIsCSv] = useState(false)
    const [rowData, setRowData] = useState([])
    const [columnData, setColumnData] = useState([])
    const [isrow, setIsRow] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const saveImportedData = () => {
        axios.post("http://localhost:5000/postImportUserData", rowData).then(res => {
            console.log(res)
        })
    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                const { result } = event.target;
                const records = parse(result, {
                    columns: ["id", "email", "mobile_number", "address"],
                    trim: true,
                    skip_empty_lines: true
                });
                setCsvData(records);
                if (records) {
                    let headerList = []
                    headerList.push(records[0])
                    setColumnData(headerList)
                    setIsRow(true)
                    setRowData(records.slice(1))
                    setShowSaveButton(true)
                }
                setIsCSv(true)
            };
            fileReader.readAsText(file);
        }
    };
    return (
        <div style={{ textAlign: "center" }}>
            <h1>CSV Import Page</h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />
                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>
            {iscsv &&

                columnData.map((header) => {
                    return (
                        <>
                            <table class="table" style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col" contentEditable='true'>{header.id}</th>
                                    <th scope="col" contentEditable='true'>{header.email}</th>
                                    <th scope="col" contentEditable='true'>{header.mobile_number}</th>
                                    <th scope="col" contentEditable='true'>{header.address}</th>
                                    
                                </tr>
                            </table>
                        </>
                    )

                })}
            {isrow &&
                rowData.map((row) => {
                    return (
                        <>
                            <table class="table" style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="row" style={{ textAlign: 'center' }}></th>
                                    <td >{row.id}</td>
                                    <td >{row.email}</td>
                                    <td >{row.mobile_number}</td>
                                    <td>{row.address}</td>
                                 
                                </tr>
                            </table>

                        </>
                    )


                })
            }
            {showSaveButton && <button onClick={saveImportedData}>Save Imported Data</button>}

        </div>
    );
}