import React, { useState, useEffect } from 'react';
import './App.css';
import Square from './components/Square';
import _, { indexOf } from 'lodash';
import InfoBlock from './components/InfoBlock';
function App() {
  const [data, setData] = useState([]);
  const [background, setBackground] = useState(true);
  const [mode, setMode] = useState(5);
  const [squareWrapper, setSquareWrapper] = useState(mode * 41 + mode * 2 + 'px');
  const [row, setRow] = useState(mode);
  const [column, setColumn] = useState(mode);
  const [r, setR] = useState();
  const [c, setC] = useState();
  const [info, setInfo] = useState([]);
  const firstColor = '#ffffff';
  const secondColor = '#03a8f4';

  const getData = () => {
    let data = [];
    fetch('http://demo1030918.mockable.io/')
      .then(response => response.json())
      .then(json => {
        for (let i in json) {
          data.push({ mode: i, field: json[i].field })
        }
        setData(data)
      })
  }

  const handleHover = (event) => {
    setC(+event.target.id.split('_')[0])
    setR(+event.target.id.split('_')[1])
    info.includes(`row ${r} col ${c}`) || !c&&!r ? info.splice(indexOf(`row ${r} col ${c}`), 1) :  info.push(`row ${r} col ${c}`)
    setBackground(!background)
    background ? event.target.style.backgroundColor = firstColor : event.target.style.backgroundColor = secondColor;
  }
  useEffect(() => {
    getData()
    setRow(mode)
    setColumn(mode)
    setSquareWrapper(mode * 41 + mode * 2 + 'px')
  }, [mode]);

  return (
    <div className="App">
      <div className='main-content'>
        <div className='main-form'>
          <select className='select' onChange={(event) => {
            setMode(event.target.value)
          }}>
            {data.map((element, i) => <option key={i} value={element.field} >{element.mode}</option>)}
          </select>
          <button className='start-btn' onClick={() => { }}>START</button>
        </div>
        <div className='squares-wrapper' style={{ width: squareWrapper }}>
          {_.times(row, (r) => {
            return _.times(column, (c) => <Square background={background} handleHover={handleHover} key={c} id={`${r + 1}_${c + 1}`} />)
          })
          }
        </div>
      </div>
      <div className='info-block'>
          <h1>Hover squares</h1>
          <div className='squares-info'>
            {info.map(info => <InfoBlock text={info}/>)}
          </div>
      </div>
    </div>
  );
}

export default App;
