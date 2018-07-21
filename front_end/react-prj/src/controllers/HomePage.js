
class Home extends Component {
  
  onCreateProfileClick() {
    //Rotate into Create Profile page (change element of DOM)
  }

  onViewProfileClick() {
    //Rotate into View Profile page (change element of DOM)
  }
  
  render() {
    return (
      <div>
        <h1>Header</h1>
        <div>
          <button onClick={this.onCreateProfileClicked}>Create profile</button>
          <button onClick={this.onViewProfileClick}>View Profile</button>
        </div>
      </div>
    );
  }
}
