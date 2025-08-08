import FormField from '../FormField/FormField.jsx';

const Input = ({id, label, error, ...props }) => {
    return (
        <FormField id={id} label={label} error={error}>
            <input className="Input" id={id} {...props}/>
        </FormField>
    )
}

export default Input;