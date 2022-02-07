import { Component } from "react/cjs/react.production.min";
import ErrorMassege from "../errorMassege/ErrorMassege";

class ErrorBoundary extends Component{

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
       console.log(error, errorInfo);
       this.setState({
           error: true
       })
    }

    render() {
        if(this.state.error) {
            return <ErrorMassege/>
        }
        return(
            this.props.children
            
        )
    }

}

export default ErrorBoundary;