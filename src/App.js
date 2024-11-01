import { useEffect } from 'react';
import './App.css';
const tg =  window.Telegram.WebApp;


function App()  {

  useEffect( () =>{
    tg.ready();
  })

  const onClose =  () => {
    tg.close()
  }

  return (
    <div className="App">
      LESHA
        <button onClick={onClose}>
          ну пиздец
        </button>
    </div>
  );
}

export default App;