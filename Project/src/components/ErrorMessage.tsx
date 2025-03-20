


type ErrorMessageProps = {
    message: string
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {


    return (
        <>
            <p className="errorMessage">{message}</p>
        </>
    )
}

export default ErrorMessage;