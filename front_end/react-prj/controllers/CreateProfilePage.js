class CreateProfileView extends Component {

    onSubmit() {

    }

    onChange() {

    }


    render() {

        return (
            <div>
                <h1>Header</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Private Key:
                        <input type="text" name="private_key" onChange={this.handleChange} />
                    </label>
                    <label>
                        Personal ID:
                        <input type="text" name="personal_id" onChange={this.handleChange} />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                    <label>
                        Date of Birth:
                        <input type="text" name="dob" onChange={this.handleChange} />
                    </label>
                    <label>
                        Contact:
                        <input type="text" name="contact" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div >
        )
    }
}