import React, { useEffect } from "react";
import './Form.css';
import { useTelegram } from "../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [sity, setSity] = useState('');
    const [subject, setSubject] = useState('physucal');
    const {tg} = useTelegram();

    const onChangeCountry = (a) => {
        setCountry(e.target.value)
    }

    const onChangeSity = (a) => {
        setSity(e.target.value)
    }

    const onChangeSubject = (a) => {
        setSubject(e.target.value)
    }

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!country || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, city])

    return (
        <div className={'form'}>
            <h3>введите ваши данные</h3>
            
            <input 
                className={'input'} 
                type='text' 
                placeholder={'страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input 
                className={'input'} 
                type='text' 
                placeholder={'город'}
                value={country}
                onChange={onChangeSity}
            />

            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ лицо</option>
                <option value={'legal'}>Юр  лицо</option>
            </select>
        </div>
    );
};

export default Form;