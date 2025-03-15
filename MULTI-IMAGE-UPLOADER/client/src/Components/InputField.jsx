import "./InputField.css";

const InputField = ({ label, type, name, value, handleInput }) => {
    return (
        <div className="inputGroup">
            <label htmlFor={name} className="inputLabel">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleInput}
                className="input"
            />
        </div>
    )
}

export default InputField;
