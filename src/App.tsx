import './App.css';
import { Component } from 'react';
import ListComponent from './components/List/list';
class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h1>To do list</h1>
          <ListComponent>
          </ListComponent>
        </div>
      </>
    );
  };
}

export default App;
