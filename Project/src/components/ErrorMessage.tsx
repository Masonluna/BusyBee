


type ErrorMessageProps = {
    message: string
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {


    return (
        <>
            <p className="errorMSG">{message}</p>
        </>
    )
}

export default ErrorMessage;