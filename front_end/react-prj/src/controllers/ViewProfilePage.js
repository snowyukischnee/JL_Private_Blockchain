class ViewProfileView extends Component {

    onCreateRecord() {

    }

    onViewRecord() {
        
    }


    render() {
        var person = {
            personal_id = '123',
            name: 'Someone',
            age: '30',
            start_date = '10/10',
            end_date = '11/10'

        };
        return (
            <div>
                <h1>Header</h1>
                <p>Personal ID: {person.personal_id}</p>
                <p>Name: {person.name}</p>
                <p>Age: {person.age}</p>
                <p>Start date: {person.start_date}</p>
                <p>End date: {person.end_date}</p>
                <hr />
                <button onClick={this.onCreateRecord}>Create profile</button>
                <button onClick={this.onViewRecord}>View Profile</button>
            </div>
        )
    }


}