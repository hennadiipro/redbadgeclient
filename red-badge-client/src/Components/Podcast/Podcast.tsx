import React, {Component, SyntheticEvent} from 'react'
import { FormGroup, Label, Form, Button, Input, Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col} from "reactstrap";
import PodcastDisplay from "./PodcastDisplay";
import {IResult} from "./Interfaces";

interface IState {
    searchTerm: string
    results: IResult []
}
interface IProps {
    token: any
}

export default class Podcast extends React.Component<IProps, IState> {
    constructor (props: IProps) {       
    super(props);
    this.state = {
        searchTerm: "",
        results: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

podcastFetch = () => {
    let key:string = "BQD-36Uhcvrh77pKlXSifqd7q47R29qWf0fUEJ4bdQPBSLjOFuacSqPlH70Y5PJaOgZZB6YH-sPRJilvHE2J-AlmDpYtC0WQfFx_Vweeg4s7GOGCIm2ms-5vXvjQAmXZ7GgUfIWYOo8Bhqj5h_Kt"
    fetch(`https://api.spotify.com/v1/search?q=${this.state.searchTerm}&type=show`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + key
        }
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.shows.items)
        this.setState ({
            results: data.shows.items
        })
    })
}

handleSubmit (event: SyntheticEvent):void {
    event.preventDefault();
    this.podcastFetch();
  }
  handleChange(event: SyntheticEvent):void {
    const input = event.target as HTMLInputElement;
    console.log(input.name, input.value);
    this.setState(
      (prevstate: IState)=>
      ({ ...prevstate, [input.name]: input.value} as IState
      )
    );
  }


    render() {
        // console.log(this.state.results)
        return (
            <div>
                <h1>Search show by genre</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="searchTerm"></Label>
                        <Input 
                        type="text"
                        id="searchTerm"
                        name="searchTerm"
                        value={this.state.searchTerm}
                        onChange = {this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit">Search</Button>
                </Form>
                
                {this.state.results  ? (
          <PodcastDisplay 
            results={this.state.results}
            token={this.props.token}
          />
          ) : null}
          </div>
      )
  }
}






