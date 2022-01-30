import error from './error.gif'

const ErrorMassege = () => {
    return (
        <img src={error} alt="error" style = {{objectFit: 'contain', display: 'block', width: '250px', height: '250px', margin: '0 auto'}}/>
    )
}

export default ErrorMassege;