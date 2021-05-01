import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

type acceptedProps = {
  token: any;
  favorites?: any
}

type valueTypes = {
  publisher: string;
}


export class PodcastFavorites extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      publisher: ""
    }
  }

  handleSubmit = (id: any) => {
    fetch(`http://localhost:3000/podcast/user/${id}`, {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      })
    })
      .then((res) => { res.json },)
      .then((data) => {
        console.log(data)
      }).catch(error => console.log(error))
  }


  updatePodcast = (id: any) => {
    fetch(`http://localhost:3000/podcast/${id}`, {
      method: "PUT",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }),
      body: JSON.stringify({
        publisher: this.state.publisher,
      })
    }).then(() => {
      this.handleSubmit
    })
  }


  deletePodcast = (id: any) => {
    fetch(`http://localhost:3000/podcast/${id}`, {
      method: "DELETE",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      })
    })
      .then(() => {
        this.handleSubmit
      })
  }


  render() {
    return (
      <div><h1>HELLO</h1></div>
    )
  }
}



export default PodcastFavorites