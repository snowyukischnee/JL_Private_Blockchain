

class RecordAuthendicate extends React.Component {
    constructor(pros) {
        super(props);

    }

    render() {
        return (
            <div>
                <h1>Header</h1>
                <form>
                    Private Key: <input type="text" name="private_key" onChange={this.handleChange} />
                    <button onClick={this.validateAuthendication}>OK</button>
                </form>
            </div>

        )
    }

}



class CreateRecordPage extends React.Component {

    constructor(pros) {
        super(pros);

        this.handleChange = this.handleChange.bind(this);
        this.validateAuthendication = this.validateAuthendication.bind(this);
        this.onRecordFormSubmit = this.onRecordFormSubmit.bind(this);
        this.state = {
            formElements: ["", ""],
            isValidKey: false,
            private_key: ""
        }
    }

    handleChange(event) {
        this.setState({
            private_key: event.target.elements.private_key.value
        })
    }

    validateAuthendication(event) {
        // Input isAddress value to compare with private key
        if (this.state.private_key === "") {
            this.setState(() => {
                return {
                    isValidKey = true
                }
            });
        } else {
            alert("Private key and address is not match");
        }
    }


    onRecordFormSubmit() {

    }

    render() {
        return (
            <div>
                <h1>Header</h1>
                {this.state.isValidKey ? (<div>
                    <form>
                        <input type="text" name="" />
                        <input type="text" name="" />
                        <input type="text" name="" />
                        <button onClick={this.onRecordFormSubmit}> Submit </button>                    
                    </form>
                </div>) : (
                    <div>
                        <RecordAuthendicate/>
                    </div>
                )}
            </div>
        )
    }




}