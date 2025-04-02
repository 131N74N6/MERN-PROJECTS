export default function InputFields({ fieldName, handleInput, placeholder, dataValue, type }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={fieldName} className="text-lg">Password</label>
            <input 
                placeholder={placeholder} type={type} id={fieldName} name={fieldName} 
                className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={dataValue}
            />
        </div>
    )
}
