import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={()=> {this.printPDF()}}>generate PDF in frontend</button>
          <button onClick={()=> {this.savePDF()}}>generate PDF in puppeteer</button>
        </header>
      </div>
    );
  }

  printPDF () {
    const element = document.querySelector('.App')
    html2canvas(document.body).then(function(canvas) {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPdf()
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height)
      pdf.save('test.pdf')
    });
  }

  getPDF() {
    return axios.get('//localhost:3001/puppeteer', {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    })
  }

  savePDF() {
    this.getPDF()
      .then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf'})
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'test.pdf'
        link.click()
      })
      .catch(e => console.log(e))
  }
}

export default App;
