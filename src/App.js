import './App.css';
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';



function App()  {
  const {onToogleButton, tg} = useTelegram();

  useEffect( () =>{
    tg.ready();
  }, [])

  return (
    <div className="App">
      <button onClick={onToogleButton}>
        toogle
      </button>
    </div>
  );
}

export default App;