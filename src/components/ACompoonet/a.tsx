import React, { Component } from 'react'
import './a.style.css'

type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};

export class A extends Component<MyProps, MyState> {
  state: MyState = { count: 0 };
  render() {
    return (
      <>
        <div className="ane">Hello {this.props.message}</div>
        <div>{this.props.children}</div>
      </>
    )
  }
}

export default A
