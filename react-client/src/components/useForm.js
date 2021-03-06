import {useState} from 'react';

const useForm = (initialFieldValues, validateForm, setPlayerId) => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value} = e.target;
        const fieldValue = {[name]: value}
        setValues({
            ...values,
            ...fieldValue
        });
        validateForm(fieldValue);
    }

    const resetForm = () =>{
        setValues({
            ...initialFieldValues
        });
        setErrors({});
        setPlayerId(0);
    }

    return{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

export default useForm;